import React from "react";

import "./Avatar.css";

export type AvatarProps = {
    src?: any,
    alt?: string,
    letter?: string
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
    return <div className="item__avatar">
        {src ? <img src={src} alt={alt} /> : letter}
    </div>;
}

export default React.memo(Avatar);