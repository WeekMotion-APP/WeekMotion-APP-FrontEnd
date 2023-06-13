import { createSlice } from '@reduxjs/toolkit';
import { note } from '../../types/data/type';

const initialState: note = {
  title: '',
  content: '',
  date: new Date()
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split(' ')
    .join('')
    .slice(0, -1),
  updateTarget: '',
};

const noteSlice = createSlice({
  name: 'note',
  initialState: initialState,
  reducers: {
    setNote: (state, action) => {
      state.title =
        action.payload.title === undefined
          ? initialState.title
          : action.payload.title;
      state.content =
        action.payload.content === undefined
          ? initialState.content
          : action.payload.content;
      state.date =
        action.payload.date === undefined
          ? initialState.date
          : action.payload.date;
    },
    setUpdateTarget: (state, action) => {
      state.updateTarget = action.payload;
    },
    reset: (state) => {
      state.title = initialState.title;
      state.content = initialState.content;
      state.date = initialState.date;
    },
  },
});
export const { setNote, setUpdateTarget, reset } = noteSlice.actions;
export default noteSlice;
