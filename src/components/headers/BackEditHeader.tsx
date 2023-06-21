import React from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setCheckedEmotion } from '../../redux/slice/emotionSlice';
import { setNote, setUpdateTarget } from '../../redux/slice/noteSlice';
import { globalStyles } from '../../styles/globalStyles';
import { diary } from '../../types/data/type';
import { PostScreenProps } from '../../types/navigation/type';

export const BackEditHeader = ({
  route,
  navigation,
}: {
  route: PostScreenProps['route'];
  navigation: PostScreenProps['navigation'];
}) => {
  const currentDiary = useAppSelector((state) => {
    return state.diary.allDiary.find((diary: diary) => {
      return diary.seq === route.params.postId;
    });
  });
  const dispatch = useAppDispatch();
  return (
    <View style={globalStyles.headerContainer}>
      <TouchableHighlight
        underlayColor={'white'}
        onPress={() => navigation.goBack()}
      >
        <Image source={require('../../assets/images/backIcon.png')} />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={'white'}
        onPress={() => {
          dispatch(
            setNote({
              title: currentDiary?.title,
              content: currentDiary?.contents,
              date: new Date(currentDiary?.diaryDate || '')
                .toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
                .split(' ')
                .join('')
                .slice(0, -1),
            })
          );
          dispatch(
            setCheckedEmotion(
              currentDiary?.tags.map((item) => {
                return item.tag;
              })
            )
          );
          dispatch(setUpdateTarget(route.params.postId));
          navigation.navigate('Edit', {
            status: 'update',
            date: 'selectedDay',
          });
        }}
      >
        <Image source={require('../../assets/images/editIcon.png')} />
      </TouchableHighlight>
    </View>
  );
};
