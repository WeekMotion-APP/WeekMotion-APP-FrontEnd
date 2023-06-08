import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { DiaryScreenProps } from '../../types/navigation/type';

export const DiaryTab = ({ route, navigation }: DiaryScreenProps) => {
  return (
    <View style={styles.container}>
      <View
        style={
          route.params.view === 'calendar'
            ? styles.buttonActiveView
            : styles.buttonView
        }
      >
        <Button
          mode="text"
          rippleColor={'white'}
          contentStyle={styles.buttonContent}
          labelStyle={
            route.params.view === 'calendar'
              ? styles.buttonActiveText
              : styles.buttonText
          }
          onPress={() =>
            navigation.navigate('Diary', {
              view: 'calendar',
              location: 'calendar',
            })
          }
        >
          캘린더
        </Button>
      </View>
      <View
        style={
          route.params.view === 'list'
            ? styles.buttonActiveView
            : styles.buttonView
        }
      >
        <Button
          mode="text"
          rippleColor={'white'}
          contentStyle={styles.buttonContent}
          labelStyle={
            route.params.view === 'list'
              ? styles.buttonActiveText
              : styles.buttonText
          }
          onPress={() =>
            navigation.navigate('Diary', { view: 'list', location: 'calendar' })
          }
        >
          목록
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 56,
    backgroundColor: 'white',
  },
  buttonActiveView: {
    width: '50%',
    height: '100%',
    borderBottomWidth: 3,
    borderBottomColor: '#FFD54A',
  },
  buttonView: {
    width: '50%',
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ACACAC',
  },
  buttonContent: {
    height: '100%',
  },
  buttonActiveText: {
    color: '#FFD54A',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonText: {
    color: '#ACACAC',
    fontSize: 18,
    fontWeight: '400',
  },
});
