import React from "react";

import "./ReposSearchPage.css";
import Button from "@components/Button";
import Input from "@components/Input";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";

const ReposSearchPage: React.FC = () => {
    const [currentInputValue, setInputValue] = React.useState<string>('');

    const handleOnChange = (event): void => {
        const { value } = event.target;
        setInputValue(value);
    };

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [repoList, setRepoList] = React.useState<null | RepoItem[]>(null);


    const gitHubStore = new GitHubStore();

    const handleOnButtonClick = (event: React.MouseEvent): void => {
        event.preventDefault();

        if (currentInputValue.length > 0) {
            setIsLoading(true);
            gitHubStore.getOrganizationReposList({
                org: currentInputValue,
                query: {
                    per_page: 5
                }
            }).then(result => {
                setRepoList(result.data);
                setIsLoading(false);
            })
        }
        else {
            setRepoList(null);
        }
    }

    //React.useEffect(() => { }, []);
    const [isVisibleDrawer, setIsVisibleDrawer] = React.useState<boolean>(false);
    const [selectedRepo, setSelectedRepo] = React.useState<null | RepoItem>(null);

    const handleOnItemClick = (repoIndex: number): void => {
        if (repoList) {
            setSelectedRepo(repoList[repoIndex] || null);
            setIsVisibleDrawer(true);
        }

        /*gitHubStore.getBranchesReposList({
            owner: string,
            repo:            
        }).then(result => {
                setRepoList(result.data);
                setIsLoading(false);
            })*/
    };

    const handleOnCloseDrawer = () => {
        setIsVisibleDrawer(false);
        setSelectedRepo(null);
    }

    return <div>
        <RepoBranchesDrawer isVisible={isVisibleDrawer} selectedRepo={selectedRepo} onClose={handleOnCloseDrawer} />
        <form className="search-form">
            <div className="search-form__content">
                <Input className="search-form__input" name="search" placeholder="Введите название организации" value={currentInputValue} onChange={handleOnChange} />
                <Button className="search-form__button" onClick={handleOnButtonClick} disabled={isLoading} >
                    <SearchIcon currentColor="white" />
                </Button>
            </div>
        </form>
        <div className="list">

            {(repoList && repoList.length > 0) ?
                repoList?.map((repo, index) => (
                    <RepoTile key={repo.id} item={repo} onClick={() => handleOnItemClick(index)} />
                ))
                : <p>Ничего не найдено</p>
            }
        </div>
    </div>;
};

export default ReposSearchPage;