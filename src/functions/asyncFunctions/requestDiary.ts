import { createAsyncThunk } from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { requestURL } from '../../../requestURL';
import { diary, note, tag } from '../../types/data/type';
import { PostScreenProps } from '../../types/navigation/type';

export const requestCreateDiary = async ({
  diary,
  emotion,
  category,
  duplicated = false,
  navigation,
}: {
  diary: note;
  emotion: tag[];
  category: string;
  duplicated: boolean;
  navigation: PostScreenProps['navigation'];
}) => {
  try {
    if (duplicated) {
      throw new Error('캘린더에 이미 일기가 있어요.');
    }
    const accessToken = await EncryptedStorage.getItem('accessToken');
    const response = await axios.post(
      '/diary',
      {
        title: diary.title,
        contents: diary.content,
        diaryDate: diary.date,
        calenderYn: category === 'calendar' ? 'Y' : 'N',
        tagSeq: emotion.map((item: tag) => {
          return item.seq;
        }),
      },
      {
        baseURL: requestURL,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 201) {
      if (category === 'calendar') {
        Toast.show({
          type: 'successToast',
          text1: '캘린더에 감정이 등록되었어요!',
          position: 'bottom',
        });
        navigation.navigate('Diary', {
          view: 'calendar',
          location: 'calendar',
        });
      } else if (category === 'trash') {
        Toast.show({
          type: 'successToast',
          text1: '소각장에 감정이 등록되었어요!',
          position: 'bottom',
        });
        navigation.navigate('Diary', { view: 'list', location: 'trash' });
      }
    }
  } catch (error: any) {
    Toast.show({
      type: 'errorToast',
      text1: error.message ? error.message : '일기 등록에 실패했어요.',
      position: 'bottom',
    });
  }
};

export const requestReadDiary = createAsyncThunk(
  'requestReadDiary',
  async (category: string = 'calendar') => {
    try {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      const response = await axios.get('/diary', {
        baseURL: requestURL,
        params: {
          calenderYn: category === 'calendar' ? 'Y' : 'N',
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data.data;
    } catch (error) {
      Toast.show({
        type: 'errorToast',
        text1: '일기 목록을 불러오지 못했어요.',
        position: 'bottom',
      });
    }
  }
);

export const requestUpdateDiary = async ({
  targetDiary,
  content,
  updateEmotion,
}: {
  targetDiary: diary | undefined;
  content: { title: string; content: string; date: string };
  updateEmotion: any;
}) => {
  try {
    if (!targetDiary) {
      return;
    } else {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      const response = await axios.patch(
        `/diary/${targetDiary.seq}`,
        {
          title: content.title,
          contents: content.content,
          calenderYn: targetDiary.calenderYn,
          tags: updateEmotion,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          baseURL: requestURL,
        }
      );
      Toast.show({
        type: 'successToast',
        text1: '업데이트 성공!',
        position: 'bottom',
      });
      return response.data.data;
    }
  } catch (error) {
    Toast.show({
      type: 'errorToast',
      text1: 'Error!',
      position: 'bottom',
    });
  }
};

export const requestUpdateDiaryCategory = async (diary: diary | undefined) => {
  try {
    if (!diary) {
      return;
    } else {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      const response = await axios.patch(
        `/diary/${diary.seq}`,
        {
          calenderYn: diary.calenderYn === 'Y' ? 'N' : 'Y',
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          baseURL: requestURL,
        }
      );
      Toast.show({
        type: 'successToast',
        text1: '업데이트 성공!',
        position: 'bottom',
      });
      return response.data.data;
    }
  } catch (error) {
    Toast.show({
      type: 'errorToast',
      text1: 'Error!',
      position: 'bottom',
    });
  }
};

export const requestDeleteDiary = async (seq: string | undefined) => {
  if (!seq) {
    return;
  }
  try {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    const response = await axios.delete(`/diary/${seq}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      baseURL: requestURL,
    });
    Toast.show({
      type: 'successToast',
      text1: '감정이 완전히 소각되었어요!',
      position: 'bottom',
    });
    return response.data.data;
  } catch (error) {
    Toast.show({
      type: 'errorToast',
      text1: 'Error!',
      position: 'bottom',
    });
  }
};

export const requestCheckDiaryInCalendar = async (diary: diary) => {
  try {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    const response = await axios.get('/diary', {
      baseURL: requestURL,
      params: {
        calenderYn: 'Y',
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data: diary[] = response.data.data;
    return data.find((post: diary) => {
      return post.diaryDate === diary.diaryDate;
    }) === undefined
      ? true
      : false;
  } catch (error) {
    Toast.show({
      type: 'errorToast',
      text1: '일기 목록을 불러오지 못했어요.',
      position: 'bottom',
    });
  }
};
