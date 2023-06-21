import React from 'react';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import styles from './select.module.sass';
import MenuItem from '@mui/material/MenuItem/MenuItem';

interface OptionType {
    value: string;
    text: string;
}

interface PropsType extends Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'as'> {
    label: string;
    value: string;
    setValue: (value: string) => void;
    options: OptionType[];
}

const Select: React.FC<PropsType> = ({ label, value, setValue, options, ...props }) => {
    const onChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value;
        setValue(newValue);
    };

    return (
        <MuiSelect className={styles.select} value={value} onChange={onChange}>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.text}
                </MenuItem>
            ))}
        </MuiSelect>
    );
};

export default Select;
