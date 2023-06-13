import React from 'react';
import { Button } from 'react-native-paper';
import { SelectEmotionScreenProps } from '../../types/navigation/type';
import { globalStyles } from '../../styles/globalStyles';

export const SelectEmotionButton = ({
  route,
  navigation,
}: SelectEmotionScreenProps) => {
  const filterSelectEmotionButton = () => {
    if (route.params.status === 'before') {
      return (
        <Button
          mode="contained"
          style={globalStyles.button}
          contentStyle={globalStyles.buttonContent}
          buttonColor="#FFD54A"
          onPress={() =>
            navigation.navigate('Edit', {
              status: 'create',
              date: route.params.date === 'today' ? 'today' : 'selectedDay',
            })
          }
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
          onPress={() =>
            navigation.navigate('Post', {
              location: 'created',
              postId: undefined,
            })
          }
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
          onPress={() => navigation.goBack()}
        >
          {'감정 수정하기'}
        </Button>
      );
    }
  };
  return filterSelectEmotionButton();
};
