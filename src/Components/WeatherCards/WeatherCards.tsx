import styles from "./WeatherCards.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { CardContainer, WeatherCard, Radio } from "../";
import { useInput } from "../../Helpers/Hooks";

export default function WeatherCards() {
	const storeCards = useSelector((store: RootState) => store.cards.loaded);
	const [order, setOrder] = useState<string>("temp");
	const [direction, setDirection] = useState<string>("asc");
	const [searchbar, handleSearchbar] = useInput("")

	function toggleDirection() {
		setDirection((direction) => (direction === "asc" ? "desc" : "asc"));
	}

	function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
		const { value } = event.target;
		setOrder(() => value);
	}

	let orderedCards = [...storeCards].sort((a, b) => {
		const map: {[key: string]: number} = {
			temp: a.temp - b.temp,
			max: a.max - b.max,
			min: a.min - b.min,
		};
		return direction === "asc" ? map[order] : -map[order];
	});

	const options = [
		{ name: "Current", value: "temp" },
		{ name: "Min", value: "min" },
		{ name: "Max", value: "max" },
	];

	return (
		<section id={styles.weatherCards}>
			<div id={styles.search}>
				<div id={styles.order}>
					<div className={styles.options}>
						<Radio options={options} label="Temperature" onSelect={handleSelect} name="temperature" />
						<button onClick={toggleDirection}>
							<span className="material-icons">arrow_{direction === "asc" ? "upward" : "downward"}</span>
						</button>
					</div>
				</div>
				<input
					id={styles.searchbar}
					type="text"
					value={searchbar}
					onChange={handleSearchbar}
					name="searchbar"
					placeholder="Search"
				/>
			</div>
			<CardContainer id={styles.cardContainer}>
				{orderedCards
					.filter((card) => card.city.startsWith(searchbar))
					.map((card, index) => (
						<WeatherCard key={`${card.city}${index}`} {...card} />
					))}
			</CardContainer>
			{searchbar && orderedCards.filter((card) => card.city.startsWith(searchbar)).length === 0 && <p>No results.</p>}
			{storeCards.length === 0 && <p>Add a card with the button at the bottom right of your screen.</p>}
		</section>
	);
}
