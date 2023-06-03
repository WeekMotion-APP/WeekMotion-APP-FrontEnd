import { createSlice } from '@reduxjs/toolkit';
import { note } from '../../types/data/type';

const initialState: note = {
  title: '',
  content: '',
  date: '',
};

const noteSlice = createSlice({
  name: 'note',
  initialState: initialState,
  reducers: {
    setNote: (state, action) => {
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.date = action.payload.date;
    },
  },
  //   extraReducers: (builder) => {},
});
export const { setNote } = noteSlice.actions;
export default noteSlice;
