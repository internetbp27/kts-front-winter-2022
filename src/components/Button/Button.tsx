import React from 'react';

type ButtonProps = React.PropsWithChildren<{
    className?: any,
    onClick?: (e: React.MouseEvent) => void,
    disabled?: boolean
}>;


const Button: React.FC<ButtonProps> = ({ className, children, onClick, disabled }) => {
    return <button
        className={className}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>;
}

export default Button;