import React, { ReactEventHandler, useState } from 'react';

export default function useInput(defaultValue: string):[string, ReactEventHandler<HTMLInputElement>, React.Dispatch<React.SetStateAction<string>>] {
	const [value, setValue] = useState<string>(defaultValue);

	function handler(event: React.ChangeEvent<HTMLInputElement>){
		const { value } = event.currentTarget;
		setValue(() => value);
	};

	return [value, handler, setValue];
}
