import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/es/storage";
import { WeatherCardProps } from "../../../Components/WeatherCard/WeatherCard";

interface CardsState {
	loaded: WeatherCardProps[];
	fetching: boolean;
	error?: string | null;
}

const initialState = {
	loaded: [],
	fetching: false,
	error: null,
} as CardsState;

const cardSlice = createSlice({
	name: "cards",
	initialState,
	reducers: {
		fetchCard_Start: (state) => {
			state.fetching = true;
			state.error = null;
		},
		fetchCard_Success: (state, action) => {
			state.loaded = [...state.loaded, action.payload];
			state.fetching = false;
		},
		fetchCard_Failure: (state, action) => {
			state.error = action.payload;
			state.fetching = false;
		},
		deleteCard: (state, action: PayloadAction<string>) => {
			state.loaded = state.loaded.filter((element) => element.city !== action.payload);
		},
	},
});

const userPersistConfig = {
	key: "user",
	storage: storage,
};

export const { fetchCard_Start, fetchCard_Success, fetchCard_Failure, deleteCard } = cardSlice.actions;

const cardsReducer = persistReducer(userPersistConfig, cardSlice.reducer);

export default cardsReducer;
