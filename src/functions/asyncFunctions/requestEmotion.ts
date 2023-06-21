import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { requestURL } from '../../../requestURL';

export const requestEmotion = createAsyncThunk('requestEmotion', async () => {
  // state 확인 후, 데이터 있을 시 즉시 리턴문 추가
  try {
    const response = await axios.get('/tag', { baseURL: requestURL });
    return response.data.data;
  } catch (error) {
    Toast.show({
      type: 'errorToast',
      text1: 'Error!',
      position: 'bottom',
    });
  }
});
