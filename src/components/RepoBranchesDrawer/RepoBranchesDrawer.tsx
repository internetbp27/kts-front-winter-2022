import React, { useEffect } from "react";

import GitHubStore from "@store/GitHubStore";
import { BranchItem, RepoItem } from "@store/GitHubStore/types";
import { Drawer } from "antd";

import "antd/dist/antd.css";

export type RepoBranchesDrawerProps = {
    isVisible: boolean,
    selectedRepo: null | RepoItem,
    onClose?: (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ isVisible, selectedRepo, onClose }) => {
    const [repoBranches, setRepoBranches] = React.useState<null | BranchItem[]>(null);

    useEffect(() => {
        if (selectedRepo) {
            const gitHubStore = new GitHubStore();
            gitHubStore.getBranchesReposList({
                owner: selectedRepo?.org_name || '',
                repo: selectedRepo?.name || ''
            }).then(result => {
                setRepoBranches(result.data);
            });
        }
        else {
            setRepoBranches(null);
        }
    }, [selectedRepo]);

    return <>
        <Drawer title="" placement="right" onClose={onClose} visible={isVisible}>
            <h3>Репозиторий <strong>"{selectedRepo && selectedRepo.name}"</strong></h3>
            <p>Список веток:</p>
            {repoBranches?.map((branch) => (
                <div key={branch.id} className="branch" >
                    <a href={branch.url}>
                        {branch.name}
                    </a>
                </div>
            ))}
        </Drawer>
    </>;
}

export default RepoBranchesDrawer;