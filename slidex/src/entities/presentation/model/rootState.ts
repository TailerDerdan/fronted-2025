import slidesReducer from './slideSlice';
import selectionReducer from './selectionSlice';
import presentationReducer from './presentationSlice';

export type RootState = {
	slides: ReturnType<typeof slidesReducer>;
	selection: ReturnType<typeof selectionReducer>;
	presentation: ReturnType<typeof presentationReducer>;
};
