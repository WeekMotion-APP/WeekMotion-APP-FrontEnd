import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { requestURL } from '../../../requestURL';
import Toast from 'react-native-toast-message';

export const requestUserInfo = async () => {
  function tryOnce<T>(func: () => Promise<T>): () => Promise<T> {
    let hasExecuted = false;
    let result: Promise<T> | undefined;
    return () => {
      if (!hasExecuted) {
        hasExecuted = true;
        result = func();
      }
      return result!;
    };
  }
  try {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    const response = await axios.get('/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      baseURL: requestURL,
      withCredentials: true,
    });
    if (response.data.httpStatusCode === 401) {
      await updateAccessToken;
      await tryOnce(requestUserInfo);
    } else {
      console.log(response);
    }
  } catch (error: any) {
    Toast.show({
      type: 'errorToast',
      text1: '로그인 정보가 만료되었습니다.',
      position: 'bottom',
    });
  }
};

export const updateAccessToken = async () => {
  try {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    const response = await axios.post(
      '/auth/refresh',
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
        baseURL: requestURL,
      }
    );
    await EncryptedStorage.setItem(
      'accessToken',
      response.data.data.accessToken
    );
    console.log('updated');
  } catch (error) {
    throw new Error('로그인 정보가 만료되었습니다.');
  }
};
