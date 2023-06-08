import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { DiaryTab } from '../components/buttons/DiaryTab';
import { MainHeader } from '../components/headers/MainHeader';
import { Calendar } from '../components/lists/Calendar';
import { List } from '../components/lists/List';
import { requestReadDiary } from '../functions/asyncFunctions/requestDiary';
import { useThunkDispatch } from '../redux';
import { DiaryScreenProps } from '../types/navigation/type';

export const DiaryScreen = ({ route, navigation }: DiaryScreenProps) => {
  const thunkDispatch = useThunkDispatch();
  useEffect(() => {
    if (route.params.location === 'calendar') {
      thunkDispatch(requestReadDiary('calendar'));
    } else {
      thunkDispatch(requestReadDiary('trash'));
    }
  }, [thunkDispatch, route, navigation]);
  return (
    <>
      <MainHeader route={route} navigation={navigation} />
      <View style={styles.container}>
        {route.params.location === 'calendar' && (
          <DiaryTab route={route} navigation={navigation} />
        )}
        {route.params.view === 'calendar' && <Calendar />}
        {route.params.view === 'list' && (
          <List route={route} navigation={navigation} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});
