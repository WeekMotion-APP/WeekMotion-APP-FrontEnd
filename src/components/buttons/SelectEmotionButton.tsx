import React from 'react';
import { Button } from 'react-native-paper';
import { SelectEmotionScreenProps } from '../../types/navigation/type';
import { globalStyles } from '../../styles/globalStyles';
import { useAppDispatch, useAppSelector } from '../../redux';
import Toast from 'react-native-toast-message';
import { setNote } from '../../redux/slice/noteSlice';

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
        <Button
          mode="contained"
          style={globalStyles.button}
          contentStyle={globalStyles.buttonContent}
          buttonColor="#FFD54A"
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
          {'일기 쓰러가기'}
        </Button>
      );
    } else if (route.params.status === 'after') {
      return (
        <Button
          mode="contained"
          style={globalStyles.button}
          contentStyle={globalStyles.buttonContent}
          buttonColor="#FFD54A"
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
          {'감정 선택하기'}
        </Button>
      );
    } else {
      return (
        <Button
          mode="contained"
          style={globalStyles.button}
          contentStyle={globalStyles.buttonContent}
          buttonColor="#FFD54A"
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
          {'감정 수정하기'}
        </Button>
      );
    }
  };
  return filterSelectEmotionButton();
};
