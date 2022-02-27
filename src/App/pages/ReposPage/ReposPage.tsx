import React, { useEffect, useState } from "react";

import GitHubStore from "@store/GitHubStore";
import { RepoFullItem } from "@store/GitHubStore/types";
import { useParams } from "react-router-dom";

const ReposPage: React.FC = () => {
    const { id } = useParams();

    const [repo, setRepo] = React.useState<null | RepoFullItem>(null);

    useEffect(() => {
        if (id) {
            const gitHubStore = new GitHubStore();
            gitHubStore.getRepoById({
                id: Number(id)
            }).then(result => {
                setRepo(result.data);
            });
        }
        else {
            setRepo(null);
        }
    }, [repo]);

    return <div>
        <h3>Страница репозитория {repo?.name}</h3>
        <div>
            {repo?.description}
        </div>
    </div>;
}

export default ReposPage;