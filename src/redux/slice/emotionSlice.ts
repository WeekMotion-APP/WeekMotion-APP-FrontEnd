import { createSlice } from '@reduxjs/toolkit';
import { requestEmotion } from '../../functions/asyncFunctions/requestEmotion';
import { tag } from '../../types/data/type';

const emotionSlice = createSlice({
  name: 'emotion',
  initialState: {
    emotion: [] as tag[],
    checkedEmotion: [] as tag[],
    error: '' as string | undefined,
    status: '' as string,
  },
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
