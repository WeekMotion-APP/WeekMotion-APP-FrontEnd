import { createSlice } from '@reduxjs/toolkit';

export type infoString = 'personal' | 'service' | 'marketing' | '';

const initialState: { value: infoString } = {
  value: '' as unknown as infoString,
};
const infoSlice = createSlice({
  name: 'info',
  initialState: initialState,
  reducers: {
    updateInfo: (state, action: { payload: infoString; type: string }) => {
      state.value = action.payload;
    },
  },
});

export const { updateInfo } = infoSlice.actions;
export default infoSlice;
