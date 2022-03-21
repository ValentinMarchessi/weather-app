import { ReactEventHandler, SyntheticEvent, useState } from 'react';

export default function useSelect(defaultValue: string | number): [string | number | undefined, ReactEventHandler] {
	const [selected, setSelected] = useState(defaultValue);

	const handler = (event: SyntheticEvent<HTMLInputElement, Event> & {target : HTMLInputElement}) => {
		const { value } = event.target;
		setSelected(value);
	};

	return [selected, handler];
}
