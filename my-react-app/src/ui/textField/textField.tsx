import React, { useState } from 'react';
import styled from './textField.module.sass';

interface PropsType extends Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'as'> {
    label: string;
    error?: string;
    value: string;
    setValue?: (value: string) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
}

const TextField: React.FC<PropsType> = ({ label, value, setValue, error, inputRef, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue?.(newValue);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className={`${styled.container} ${isFocused ? styled.containerFocused : ''}`}>
            <label>
                <input
                    className={styled.inputStyle}
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...props}
                />
                <div
                    className={`${styled.hiddenLabel} ${
                        isFocused || value ? styled.hiddenLabelActive : ''
                    }`}>
                    {label}
                </div>
            </label>
            {error && <div className={styled.error}>{error}</div>}
        </div>
    );
};

export default TextField;
