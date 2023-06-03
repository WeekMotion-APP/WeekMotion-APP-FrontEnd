import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import emotionSlice from './slice/emotionSlice';
import noteSlice from './slice/noteSlice';

const store = configureStore({
  reducer: {
    emotion: emotionSlice.reducer,
    note: noteSlice.reducer,
  },
  middleware: [thunkMiddleware],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useThunkDispatch = () =>
  useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
