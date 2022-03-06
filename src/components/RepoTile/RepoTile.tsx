import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { RepoItemModel } from "@store/models/GitHub";
import { Link } from "react-router-dom";

import styles from './RepoTile.module.scss';


export type RepoTileProps = {
    item: RepoItemModel
}

const RepoTile: React.FC<RepoTileProps> = ({ item }) => {
    return <Link className={styles.item} to={`/repos/${item.id}`} >
        <Avatar src={item.avatarUrl} alt={item.name} letter={item.name[0]} />
        <div className={styles.item__content}>
            <div className={styles.item__title}>{item.name}</div>
            <a className={styles.item__org_link} href={item.orgUrl || '#'}>{item.orgName}</a>
            <div className={styles.item__rate}>
                <StarIcon currentColor="dsf" />
                <span className={styles.item__rate_count}>{item.starsCount}</span>
            </div>
            <div className={styles.item__updated}>Updated {item.updatedAt}</div>
        </div>
    </Link >
};

export default React.memo(RepoTile);