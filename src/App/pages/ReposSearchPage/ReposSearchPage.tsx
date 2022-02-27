import React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";

import { useReposContext } from "../../App";
import styles from "./ReposSearchPage.module.scss";

const ReposSearchPage: React.FC = () => {
    const [currentInputValue, setInputValue] = React.useState<string>('');
    const reposContext = useReposContext();

    const handleOnChange = (event): void => {
        const { value } = event.target;
        setInputValue(value);
    };

    const handleOnButtonClick = (event: React.MouseEvent): void => {
        event.preventDefault();
        reposContext.load(currentInputValue);
    }

    //React.useEffect(() => { }, []);
    //const [isVisibleDrawer, setIsVisibleDrawer] = React.useState<boolean>(false);
    //const [selectedRepo, setSelectedRepo] = React.useState<null | RepoItem>(null);

    /*const handleOnItemClick = (repoIndex: number): void => {
        if (reposContext.list) {
            setSelectedRepo(reposContext.list[repoIndex] || null);
            setIsVisibleDrawer(true);
        }
    };*/

    /*const handleOnCloseDrawer = () => {
        setIsVisibleDrawer(false);
        setSelectedRepo(null);
    }*/

    return <div>
        <form className={styles.search_form}>
            <div className={styles.search_form__content}>
                <Input className={styles.search_form__input} name="search" placeholder="Введите название организации" value={currentInputValue} onChange={handleOnChange} />
                <Button className={styles.search_form__button} onClick={handleOnButtonClick} disabled={reposContext.isLoading} >
                    <SearchIcon currentColor="white" />
                </Button>
            </div>
        </form>
        <div className={styles.list}>
            {(reposContext.list && reposContext.list.length > 0) ?
                reposContext.list?.map((repo, index) => (
                    <RepoTile key={repo.id} item={repo} />
                ))
                : <p>Ничего не найдено</p>
            }
        </div>
    </div>;
};

export default ReposSearchPage;