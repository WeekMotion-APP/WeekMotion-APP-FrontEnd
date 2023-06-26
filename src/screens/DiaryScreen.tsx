import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { DiaryTab } from '../components/buttons/DiaryTab';
import { MainHeader } from '../components/headers/MainHeader';
import { Calendar } from '../components/lists/Calendar';
import { List } from '../components/lists/List';
import { SelectDateModal } from '../components/modals/SelectDateModal';
import { WriteTodayModal } from '../components/modals/WriteTodayModal';
import { requestReadDiary } from '../functions/asyncFunctions/requestDiary';
import { requestUserInfo } from '../functions/asyncFunctions/requestUserInfo';
import { useThunkDispatch } from '../redux';
import { DiaryScreenProps } from '../types/navigation/type';

export const DiaryScreen = ({ route, navigation }: DiaryScreenProps) => {
  const [writeTodayModalVisible, setWriteTodayModalVisible] = useState(true);
  const [selectDateModalVisible, setSelectDateModalVisible] = useState(false);
  const thunkDispatch = useThunkDispatch();
  useEffect(() => {
    if (route.params.location === 'calendar') {
      thunkDispatch(requestReadDiary('calendar'));
    } else {
      thunkDispatch(requestReadDiary('trash'));
    }
  }, [thunkDispatch, route, navigation]);

  useEffect(() => {
    requestUserInfo();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <MainHeader
          route={route}
          navigation={navigation}
          visible={selectDateModalVisible}
          setVisible={setSelectDateModalVisible}
        />
        <>
          {route.params.location === 'calendar' && (
            <DiaryTab route={route} navigation={navigation} />
          )}
          {route.params.view === 'calendar' && <Calendar />}
          {route.params.view === 'list' && (
            <List route={route} navigation={navigation} />
          )}
        </>
        <WriteTodayModal
          visible={writeTodayModalVisible}
          setVisible={setWriteTodayModalVisible}
        />
        <SelectDateModal
          route={route}
          navigation={navigation}
          visible={selectDateModalVisible}
          setVisible={setSelectDateModalVisible}
        />
      </PaperProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});
