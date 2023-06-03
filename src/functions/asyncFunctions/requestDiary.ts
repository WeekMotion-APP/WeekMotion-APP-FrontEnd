import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { requestURL } from '../../../requestURL';
import { note, tag } from '../../types/data/type';
import { PostScreenProps } from '../../types/navigation/type';

export const requestCreateDiary = async ({
  diary,
  emotion,
  category,
  navigation,
}: {
  diary: note;
  emotion: tag[];
  category: string;
  navigation: PostScreenProps['navigation'];
}) => {
  try {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    const response = await axios.post(
      '/diary',
      {
        title: diary.title,
        contents: diary.content,
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
        console.error('캘린더에 감정이 등록되었어요!');
      } else if (category === 'trash') {
        console.error('소각장에 감정이 등록되었어요!');
      }
    }
  } catch (error) {
    console.error('Error!');
  }
};
