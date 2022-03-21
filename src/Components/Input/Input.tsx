import React, { useState } from 'react';
import styles from './Input.module.scss';

type MyInputProps = {
    name: string,
    type: 'text' | 'number' | 'password' | 'email' | 'date'
    onBlur?: React.FocusEventHandler,
    onChange?: React.ChangeEventHandler,
    label: string,
}

export default function Input({ label, onBlur, onChange, name, type }: MyInputProps) {
    const [value, setValue] = useState('')
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.currentTarget;
        setValue(value);
        onChange && onChange(event);
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
		const { value } = event.currentTarget;
		setValue(value);
		onBlur && onBlur(event);
	}

	return (
		<div className={styles.container}>
			<label className={value || type==="date" ? styles.active : undefined} htmlFor={name}>
				{label}
			</label>
			<input value={value} name={name} onBlur={handleBlur} onChange={handleChange} type={type} autoComplete="off" />
		</div>
	);
}