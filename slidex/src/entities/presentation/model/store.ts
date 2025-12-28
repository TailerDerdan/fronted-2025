import { configureStore } from '@reduxjs/toolkit';
import slidesReducer from './slideSlice';
import selectionReducer from './selectionSlice';
import presentationReducer from './presentationSlice';
import { compositeMiddleware } from '../lib/compositeMiddleware';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from './rootState';
import { historyMiddleware } from '../lib/historyMiddleware';

export const store = configureStore({
	reducer: {
		slides: slidesReducer,
		selection: selectionReducer,
		presentation: presentationReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(compositeMiddleware).concat(historyMiddleware),
});

export const emptyPresState: RootState = {
	selection: {
		selectedObj: [],
		selectedSlides: [],
	},
	slides: {
		slideList: {},
		slideOrder: [],
	},
	presentation: {
		name: '',
		id: '',
	},
};

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
