import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { Link } from "react-router-dom";
import { RepoItem } from "src/store/GitHubStore/types";

import styles from './RepoTile.module.scss';

export type RepoTileProps = {
    item: RepoItem
}

const RepoTile: React.FC<RepoTileProps> = ({ item }) => {
    return <Link className={styles.item} to={`/repos/${item.id}`} >
        <Avatar src={item.avatar_url} alt={item.name} letter={item.name[0]} />
        <div className={styles.item__content}>
            <div className={styles.item__title}>{item.name}</div>
            <a className={styles.item__org_link} href={item.org_url || '#'}>{item.org_name}</a>
            <div className={styles.item__rate}>
                <StarIcon currentColor="dsf" />
                <span className={styles.item__rate_count}>{item.stars_count}</span>
            </div>
            <div className={styles.item__updated}>Updated {item.updated_at}</div>
        </div>
    </Link >
};

export default React.memo(RepoTile);