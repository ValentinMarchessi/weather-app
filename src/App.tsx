import "./App.scss";
import { Navbar, AddCard, WeatherCards } from "./Components";

function App() {
	return (
		<div className="App">
			<Navbar />
			<WeatherCards/>
			<AddCard />
		</div>
	);
}

export default App;
