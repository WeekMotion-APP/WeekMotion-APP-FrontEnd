import React from 'react';
import { Pressable, Text } from 'react-native';
import {
  requestReadDiary,
  requestUpdateDiary,
} from '../../functions/asyncFunctions/requestDiary';
import { filterUpdateEmotion } from '../../functions/filterUpdateEmotion';
import { useAppSelector, useThunkDispatch } from '../../redux';
import { globalStyles } from '../../styles/globalStyles';
import { diary } from '../../types/data/type';
import { EditScreenProps } from '../../types/navigation/type';
import Toast from 'react-native-toast-message';

export const EditButton = ({
  content,
  route,
  navigation,
}: {
  content: { title: string; content: string; date: string };
  route: EditScreenProps['route'];
  navigation: EditScreenProps['navigation'];
}) => {
  const thunkDispatch = useThunkDispatch();
  const emotion = useAppSelector((state) => {
    return state.emotion.checkedEmotion;
  });
  const target = useAppSelector((state) => {
    return state.note.updateTarget;
  });
  const targetDiary = useAppSelector((state) => {
    return state.diary.allDiary.find((post: diary) => {
      return post.seq === target;
    });
  });
  const handleUpdate = async () => {
    await requestUpdateDiary({
      targetDiary: targetDiary,
      content: content,
      updateEmotion: filterUpdateEmotion(targetDiary?.tags, emotion),
    });
    if (content.title.length === 0 || content.content.length === 0) {
      Toast.show({
        type: 'errorToast',
        text1: '작성하지 않은 항목이 있습니다.',
        position: 'bottom',
      });
      return;
    }
    await thunkDispatch(
      requestReadDiary(targetDiary?.calenderYn === 'Y' ? 'calendar' : 'trash')
    );
    navigation.goBack();
  };
  const filterEditButton = () => {
    if (route.params.status === 'create') {
      return (
        <Pressable
          style={globalStyles.button}
          onPress={() => {
            if (content.title.length === 0 || content.content.length === 0) {
              Toast.show({
                type: 'errorToast',
                text1: '작성하지 않은 항목이 있습니다.',
                position: 'bottom',
              });
              return;
            }
            navigation.navigate('SelectEmotion', {
              status: 'after',
              date: route.params.date === 'today' ? 'today' : 'selectedDay',
            });
          }}
        >
          <Text style={globalStyles.buttonContent}>다음</Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable style={globalStyles.button} onPress={handleUpdate}>
          <Text style={globalStyles.buttonContent}>수정하기</Text>
        </Pressable>
      );
    }
  };
  return filterEditButton();
};
