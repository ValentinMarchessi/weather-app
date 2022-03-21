import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { getStoredState } from "redux-persist";
import { WeatherCardProps } from "../../../Components/WeatherCard/WeatherCard";
import { fetchCard_Start, fetchCard_Success, fetchCard_Failure } from "../../Reducers/Cards";
import { RootState } from "../../store";
const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY;

export interface API_Response{
    id: number;
    name: string,
    coord: {
        lon: number,
        lat: number,
    }
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    }[];
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
    }
    wind: {
        speed: number,
        deg: number,
    }
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number,
    },
    timezone: number
    cod: number;
    message: string;
}

const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1, str.length);

export function fetchCard(city: string) {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        try {
            dispatch(fetchCard_Start());
            const loadedCards = getState().cards.loaded;
            const { data } = await axios.get<any, AxiosResponse<API_Response>>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
                .catch(error => {throw error.response.data});
            const card: WeatherCardProps = {
                cardID: data.id,
                city: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                min: data.main.temp_min,
                max: data.main.temp_max,
                feels_like: data.main.feels_like,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                weather: {
                    main: data.weather[0].main,
                    icon: data.weather[0].icon,
                },
                wind: data.wind,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
                timezone: data.timezone,
            }
            if (loadedCards.some(loadedCard => loadedCard.city === card.city)) throw { message: "City is already added." };
            dispatch(fetchCard_Success(card))
        } catch (error: any) {
            dispatch(fetchCard_Failure(capitalize(error.message) || "Unhandled Error"));
        }
    }
}