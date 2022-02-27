import React from "react";

import styles from "./Avatar.module.scss";

export type AvatarProps = {
    src?: any,
    alt?: string,
    letter?: string
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
    return <div className={styles.item__avatar}>
        {src ? <img src={src} alt={alt} /> : letter}
    </div>;
}

export default React.memo(Avatar);