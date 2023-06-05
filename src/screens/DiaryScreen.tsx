import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { DiaryTab } from '../components/buttons/DiaryTab';
import { List } from '../components/lists/List';
import { requestReadDiary } from '../functions/asyncFunctions/requestDiary';
import { useAppSelector, useThunkDispatch } from '../redux';
import { DiaryScreenProps } from '../types/navigation/type';

export const DiaryScreen = ({ route, navigation }: DiaryScreenProps) => {
  const diary = useAppSelector((state) => {
    return state.diary;
  });
  const thunkDispatch = useThunkDispatch();
  useEffect(() => {
    thunkDispatch(requestReadDiary());
  }, [thunkDispatch]);
  useEffect(() => {
    console.log(route.params.view);
  }, [route]);
  return (
    <View style={styles.container}>
      <DiaryTab route={route} navigation={navigation} />
      {route.params.view === 'list' && <List />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
