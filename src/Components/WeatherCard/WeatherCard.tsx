import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../Redux/Reducers/Cards";
import Drawer from "../Drawer/Drawer";
import styles from "./WeatherCard.module.scss";

export type WeatherCardProps = {
	city: string;
	country: string;
	temp: number;
	min: number;
	max: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	weather: {
		main: string;
		icon: string;
	};
	wind: {
		speed: number;
		deg: number;
	}
	sunrise: number;
	sunset: number;
	timezone: number;
	cardID: number;
};

function toCelcius(temp: number): string {
	return (temp - 272.15).toFixed(1);
}

export default function WeatherCard({ city, country, temp, min, max, weather, feels_like, pressure, humidity, sunrise, sunset, wind, timezone, cardID }: WeatherCardProps){
	const dispatch = useDispatch();
	const [drawer, setDrawer] = useState(false);

	function handleDelete() {
		dispatch(deleteCard(city));	
	} 

	const Temp = (
		<div className={styles.right}>
			<div id={styles.current}>
				<p>Current</p>
				<h2>{toCelcius(temp)}°C</h2>
			</div>
			<div className={styles.minmax}>
				<div id={styles.max}>
					<p>Max</p>
					<h2>{toCelcius(max)}°C</h2>
				</div>
				<div id={styles.min}>
					<p>Min</p>
					<h2>{toCelcius(min)}°C</h2>
				</div>
			</div>
		</div>
	);

	const Info = (
		<div className={styles.left}>
			<h1 id={styles.city}>{city}</h1>
			<h1 id={styles.country}>{country}</h1>
			<img
				id={styles.icon}
				src={"http://openweathermap.org/img/wn/" + weather.icon + "@2x.png"}
				width="80"
				height="80"
				alt="icon"
			/>
			<p id={styles.weather}>{weather.main}</p>
		</div>
	);

	return (
		<>
			<div id={`${cardID}`} className={styles.card}>
				<button id={styles.delete} onClick={handleDelete}>
					<span className="material-icons">clear</span>
				</button>
				{Info}
				{Temp}
			</div>
			<Drawer active={drawer}>
				<button onClick={() => setDrawer(false)}>Close</button>
				<p>{toCelcius(feels_like)}°C</p>
				<p>{pressure}bar</p>
				<p>{humidity}%</p>
				<p>{new Date((sunrise + timezone) * 1000).toUTCString()}</p>
				<p>{`${new Date((sunset + timezone) * 1000).toUTCString()} ${timezone / 60 ** 2}`}</p>
				<p>{wind.speed}km/h</p>
				<p>{wind.deg}°</p>
			</Drawer>
		</>
	);
}