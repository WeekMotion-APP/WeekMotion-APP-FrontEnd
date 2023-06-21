import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import Toast from 'react-native-toast-message';
import { requestURL } from '../../../requestURL';
import { SignInScreenProps } from '../../types/navigation/type';

export const setOnStorage = async (value: {
  accessToken: string;
  refreshToken: string;
}) => {
  try {
    await EncryptedStorage.setItem('accessToken', value.accessToken);
    await EncryptedStorage.setItem('refreshToken', value.refreshToken);
  } catch (error) {
    Toast.show({
      type: 'errorToast',
      text1: `${error}`,
      position: 'bottom',
    });
  }
};

export const requestSignIn = async (
  info: { id: string; password: string },
  navigation: SignInScreenProps['navigation']
) => {
  try {
    const response = await axios.post(
      '/auth/login',
      {
        id: info.id,
        password: info.password,
      },
      { baseURL: requestURL }
    );
    if (response.status === 201) {
      setOnStorage(response.data.data);
      Toast.show({
        type: 'successToast',
        text1: '로그인 성공!',
        position: 'bottom',
      });
      navigation.navigate('Diary', {
        view: 'calendar',
        location: 'calendar',
      });
    }
  } catch (error) {
    Toast.show({
      type: 'errorToast',
      text1: '아이디 또는 비밀번호를 확인해주세요.',
      position: 'bottom',
    });
  }
};
