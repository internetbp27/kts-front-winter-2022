import React from "react";

type InputProps = {
    className?: string,
    name: string,
    value: string | undefined,
    placeholder?: string,
    onChange?: (e: React.ChangeEvent) => void
}


const Input: React.FC<InputProps> = ({ className, name, value, placeholder, onChange }) => {
    return <input
        className={className}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
}

export default React.memo(Input);