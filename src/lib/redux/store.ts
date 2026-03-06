import { configureStore } from "@reduxjs/toolkit";
import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from "react-redux";
import { hrmsApi } from "./api";
import authReducer from "./slices/auth";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[hrmsApi.reducerPath]: hrmsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(hrmsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
