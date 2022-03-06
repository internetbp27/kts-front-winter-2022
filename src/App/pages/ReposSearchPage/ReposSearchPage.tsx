import React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
//import { useReposListContext } from "../../App";
import ReposListStore from "@store/ReposListStore";
import rootStore from "@store/RootStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import styles from "./ReposSearchPage.module.scss";

const ReposSearchPage: React.FC = () => {
    useQueryParamsStoreInit();

    const reposListStore = useLocalStore(() => new ReposListStore());    
    
    //console.log('render', toJS(reposListStore.list));
    React.useEffect(() => {
        const search = rootStore.query.getParam("search")?.toString();

        if (search){
            reposListStore.getOrganizationReposList({
                org: search,
                query: {
                  per_page: 5
                }
            });

            console.log(reposListStore.list);
            console.log(reposListStore.meta);
        }        
    }, [reposListStore]);

    const handleOnChange = (event): void => {
        const { value } = event.target;
        rootStore.query.setSearch(value);
    };
   
    return <div>
        <form className={styles.search_form}  method="GET">
            <div className={styles.search_form__content}>
            <Input className={styles.search_form__input} name="search" onChange={handleOnChange} placeholder="Введите название организации" value={rootStore.query.getParam("search")?.toString()} />
                <Button className={styles.search_form__button} disabled={(reposListStore.meta == Meta.loading)} >
                    <SearchIcon currentColor="white" />
                </Button>
            </div>
        </form>
        <div className={styles.list}>
            {(reposListStore.list && reposListStore.list.length > 0) ?
                reposListStore.list?.map((repo, index) => (
                    <RepoTile key={repo.id} item={repo} />
                ))
                : <p>Ничего не найдено</p>
            }
        </div>
    </div>;
};

export default ReposSearchPage;