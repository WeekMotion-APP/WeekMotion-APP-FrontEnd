import React from 'react';
import { Button } from 'react-native-paper';
import { requestUpdateDiary } from '../../functions/asyncFunctions/requestDiary';
import { filterUpdateEmotion } from '../../functions/filterUpdateEmotion';
import { useAppSelector } from '../../redux';
import { globalStyles } from '../../styles/globalStyles';
import { diary } from '../../types/data/type';
import { EditScreenProps } from '../../types/navigation/type';

export const EditButton = ({
  content,
  route,
  navigation,
}: {
  content: { title: string; content: string; date: string };
  route: EditScreenProps['route'];
  navigation: EditScreenProps['navigation'];
}) => {
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
  const filterEditButton = () => {
    if (route.params.status === 'create') {
      return (
        <Button
          mode="contained"
          style={globalStyles.button}
          contentStyle={globalStyles.buttonContent}
          buttonColor="#FFD54A"
          onPress={() =>
            navigation.navigate('SelectEmotion', {
              status: 'after',
              date: route.params.date === 'today' ? 'today' : 'selectedDay',
            })
          }
        >
          다음
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
            requestUpdateDiary({
              targetDiary: targetDiary,
              content: content,
              updateEmotion: filterUpdateEmotion(targetDiary?.tags, emotion),
            });
            navigation.goBack();
          }}
        >
          수정하기
        </Button>
      );
    }
  };
  return filterEditButton();
};
