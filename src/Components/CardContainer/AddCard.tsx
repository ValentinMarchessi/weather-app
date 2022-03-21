import styles from "./AddCard.module.scss";
import { Modal, Searchbar, Spinner } from "../";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCard } from "../../Redux/Actions/Cards/fetchCard";
import { RootState } from "../../Redux/store";

export default function AddCard() {
	const [modal, setModal] = useState(false);
	const [searched, setSearched] = useState(false);
	const dispatch = useDispatch();
	const { error, fetching } = useSelector((store: RootState) => store.cards);

	function handleSearch(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		for (const field of form.entries()) {
			if (field[0] === "city") dispatch(fetchCard(String(field[1])));
		}
		setSearched(true);
		setTimeout(() => {
			setSearched(false);
		}, 5000);
	}

	function handleModal(action: "open" | "close") {
		if (action === "open")
			return () => {
				setModal(true);
				setSearched(false);
			};
		if (action === "close") return () => setModal(false);
	}

	return (
		<>
			<button id={styles.addCard} onClick={handleModal("open")}>
				<span className="material-icons">add</span>
			</button>
			<Modal id={styles.modal} visible={modal} backdrop>
				<h2 id={styles.header}>Add Card</h2>
				<button id={styles.close} onClick={handleModal("close")}>
					<span className="material-icons">close</span>
				</button>
				<Searchbar onSubmit={handleSearch} placeholder="Search city" clearOnSubmit/>
				<div className={styles.queryStatus}>
					{searched ? (
						fetching ? (
							<Spinner className={styles.spinner} />
						) : error ? (
							<p id={styles.error}>{error}</p>
						) : (
							`City Added`
						)
					) : null}
				</div>
			</Modal>
		</>
	);
}
