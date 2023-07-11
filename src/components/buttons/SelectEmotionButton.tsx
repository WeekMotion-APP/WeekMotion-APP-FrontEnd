import React from 'react';
import { SelectEmotionScreenProps } from '../../types/navigation/type';
import { globalStyles } from '../../styles/globalStyles';
import { useAppDispatch, useAppSelector } from '../../redux';
import Toast from 'react-native-toast-message';
import { setNote } from '../../redux/slice/noteSlice';
import { Pressable, Text } from 'react-native';

export const SelectEmotionButton = ({
  route,
  navigation,
}: SelectEmotionScreenProps) => {
  const selectedEmotion = useAppSelector((state) => {
    return state.emotion.checkedEmotion;
  });
  const dispatch = useAppDispatch();
  const filterSelectEmotionButton = () => {
    if (route.params.status === 'before') {
      return (
        <Pressable
          style={globalStyles.button}
          onPress={() => {
            if (selectedEmotion.length === 0) {
              Toast.show({
                type: 'errorToast',
                text1: '감정을 선택해주세요.',
                position: 'bottom',
              });
              return;
            }
            dispatch(setNote({ title: '', content: '' }));
            navigation.navigate('Edit', {
              status: 'create',
              date: route.params.date === 'today' ? 'today' : 'selectedDay',
            });
          }}
        >
          <Text style={globalStyles.buttonContent}>일기 쓰러가기</Text>
        </Pressable>
      );
    } else if (route.params.status === 'after') {
      return (
        <Pressable
          style={globalStyles.button}
          onPress={() => {
            if (selectedEmotion.length === 0) {
              Toast.show({
                type: 'errorToast',
                text1: '감정을 선택해주세요.',
                position: 'bottom',
              });
              return;
            }
            navigation.navigate('Post', {
              location: 'created',
              postId: undefined,
            });
          }}
        >
          <Text style={globalStyles.buttonContent}>감정 선택하기</Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable
          style={globalStyles.button}
          onPress={() => {
            if (selectedEmotion.length === 0) {
              Toast.show({
                type: 'errorToast',
                text1: '감정을 선택해주세요.',
                position: 'bottom',
              });
              return;
            }
            navigation.goBack();
          }}
        >
          <Text style={globalStyles.buttonContent}>감정 수정하기</Text>
        </Pressable>
      );
    }
  };
  return filterSelectEmotionButton();
};
