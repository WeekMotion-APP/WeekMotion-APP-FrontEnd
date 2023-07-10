import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { requestURL } from '../../../requestURL';

export const requestUserInfo = async () => {
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
      return response;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

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
  } catch (error) {
    throw new Error('로그인 정보가 만료되었습니다.');
  }
};

export const setWriteToday = async (value: string) => {
  const nowDate = new Date();
  const nextDay = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate()
  );
  const writeToday = {
    value: value,
    expires: `${nextDay.getFullYear()}-${
      String(nextDay.getMonth() + 1).length === 1
        ? '0' + String(nextDay.getMonth() + 1)
        : String(nextDay.getMonth() + 1)
    }-${
      String(nextDay.getDate()).length === 1
        ? '0' + String(nextDay.getDate())
        : String(nextDay.getDate())
    }T10:00:00.00-05:00`,
  };
  await EncryptedStorage.setItem('isWriteToday', JSON.stringify(writeToday));
};

export const clearWriteToday = async () => {
  const storageValue = await EncryptedStorage.getItem('isWriteToday');
  if (!storageValue) {
    // console.log('nothing on storage');
    return;
  }
  const resultObject = JSON.parse(storageValue);
  const currentDateTime = new Date();
  if (currentDateTime > new Date(resultObject.expires)) {
    await EncryptedStorage.removeItem('isWriteToday');
    // console.log('storage item is removed');
    // console.log(
    //   `time : ${currentDateTime} vs ${new Date(resultObject.expires)} `
    // );
    // } else {
    //   console.log('Not Yet!');
    //   console.log(
    //     `time : ${currentDateTime} vs ${new Date(resultObject.expires)}`
    //   );
  }
};
