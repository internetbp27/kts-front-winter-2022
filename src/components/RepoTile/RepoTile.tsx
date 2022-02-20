import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { RepoItem } from "src/store/GitHubStore/types";

import './RepoTile.css';

export type RepoTileProps = {
    item: RepoItem,
    onClick: (e: React.MouseEvent) => void
}

const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
    return <div className="item" onClick={onClick}>
        <Avatar src={item.avatar_url} alt={item.name} letter={item.name[0]} />
        <div className="item__content">
            <div className="item__title">{item.name}</div>
            <a className="item__org-link" href={item.org_url || '#'}>{item.org_name}</a>
            <div className="item__rate">
                <StarIcon currentColor="dsf" />
                <span className="item__rate-count">{item.stars_count}</span>
            </div>
            <div className="item__updated">Updated {item.updated_at}</div>
        </div>
    </div >
};

export default React.memo(RepoTile);