import React, { useState } from "react";
import styles from "./Radio.module.scss";

type option = {
	name: string;
	value: string | number;
};

interface SelectProps {
	label: string;
	options: option[];
	onSelect?: (event: React.BaseSyntheticEvent<any>) => any;
	id?: string;
	name: string;
}

export default function Radio({ label, options, onSelect, name }: SelectProps) {
	return (
		<div className={styles.container}>
			<p>{label}</p>
			<form>
				{options.map((option) => {
					return (
						<>
							<input onChange={onSelect} type="radio" name={name} id={option.name} value={option.value} />
							<label htmlFor={option.name}>{option.name}</label>
						</>
					);
				})}
			</form>
		</div>
	);
}
