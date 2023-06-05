import { createSlice } from '@reduxjs/toolkit';
import { requestReadDiary } from '../../functions/asyncFunctions/requestDiary';
import { diary } from '../../types/data/type';

const initialState: {
  allDiary: diary[];
  selectDateDiary: diary[];
  status: string;
  error: string | undefined;
} = {
  allDiary: [],
  selectDateDiary: [],
  status: '',
  error: '',
};

const diarySlice = createSlice({
  name: 'diary',
  initialState: initialState,
  reducers: {
    setSelectDateDiary: (state, action) => {
      const fromDate = new Date(action.payload[0]);
      const toDate = new Date(action.payload[1]);
      const includeDateDiary = state.allDiary.filter((diary: diary) => {
        return (
          new Date(diary.modDate) >= fromDate &&
          new Date(diary.modDate) <= toDate
        );
      });
      state.selectDateDiary = includeDateDiary;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestReadDiary.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(requestReadDiary.fulfilled, (state, action) => {
      state.allDiary = action.payload;
      state.status = 'fulfilled';
    });
    builder.addCase(requestReadDiary.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = 'rejected';
    });
  },
});

export const { setSelectDateDiary } = diarySlice.actions;
export default diarySlice;
