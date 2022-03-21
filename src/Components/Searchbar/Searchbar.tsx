import React from "react";
import { useInput } from "../../Helpers/Hooks";
import styles from "./Searchbar.module.scss";

interface Props {
	placeholder?: string;
	clearOnSubmit?: boolean;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function Searchbar({onSubmit, placeholder, clearOnSubmit} : Props) {
	const [input, handleInput, setInput] = useInput("")
	
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		clearOnSubmit && setInput(() => "");
		onSubmit && onSubmit(event);
	}

    return (
		<form id={styles.searchbar} onSubmit={handleSubmit}>
			<input type="text" value={input} onChange={handleInput} name="city" placeholder={placeholder} />
			<button type="submit">
				<span className="material-icons">search</span>
			</button>
		</form>
	);
}