import React from "react";

import RepoItemStore from "@store/RepoItemStore";
import { observer, useLocalStore } from "mobx-react-lite";
import { useParams } from "react-router-dom";


const RepoPage: React.FC = () => {
    const { id } = useParams();

    const repoItemStore = useLocalStore(() => new RepoItemStore());

    React.useEffect(() => {
        repoItemStore.getRepoById({
            id: Number(id)
        })
    }, [repoItemStore]);

    return <div>
        <h3>Страница репозитория {repoItemStore.item?.name}</h3>
        <div>
            {repoItemStore.item?.description}
        </div>
    </div>;
}

export default observer(RepoPage);