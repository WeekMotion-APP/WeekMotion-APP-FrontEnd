import { createSlice } from '@reduxjs/toolkit';
import { requestEmotion } from '../../functions/asyncFunctions/requestEmotion';
import { emotion } from '../../types/data/type';

const initialState: emotion = {
  emotion: [],
  checkedEmotion: [],
  error: '',
  status: '',
};

const emotionSlice = createSlice({
  name: 'emotion',
  initialState: initialState,
  reducers: {
    setCheckedEmotion: (state, action) => {
      state.checkedEmotion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestEmotion.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(requestEmotion.fulfilled, (state, action) => {
      state.emotion = action.payload;
      state.status = 'fulfilled';
    });
    builder.addCase(requestEmotion.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = 'rejected';
    });
  },
});

export const { setCheckedEmotion } = emotionSlice.actions;
export default emotionSlice;
