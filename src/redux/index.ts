import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import diarySlice from './slice/diarySlice';
import emotionSlice from './slice/emotionSlice';
import infoSlice from './slice/infoSlice';
import noteSlice from './slice/noteSlice';

const store = configureStore({
  reducer: {
    emotion: emotionSlice.reducer,
    note: noteSlice.reducer,
    diary: diarySlice.reducer,
    info: infoSlice.reducer,
  },
  middleware: [thunkMiddleware],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useThunkDispatch = () =>
  useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
