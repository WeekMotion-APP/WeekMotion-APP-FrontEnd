import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { DiaryScreenProps } from '../../types/navigation/type';

export const DiaryTab = ({ route, navigation }: DiaryScreenProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={
          route.params.view === 'calendar'
            ? styles.buttonActiveView
            : styles.buttonView
        }
        onPress={() =>
          navigation.navigate('Diary', {
            view: 'calendar',
            location: 'calendar',
          })
        }
      >
        <Text
          style={
            route.params.view === 'calendar'
              ? styles.buttonActiveText
              : styles.buttonText
          }
        >
          캘린더
        </Text>
      </Pressable>
      <Pressable
        style={
          route.params.view === 'list'
            ? styles.buttonActiveView
            : styles.buttonView
        }
        onPress={() =>
          navigation.navigate('Diary', { view: 'list', location: 'calendar' })
        }
      >
        <Text
          style={
            route.params.view === 'list'
              ? styles.buttonActiveText
              : styles.buttonText
          }
        >
          목록
        </Text>
      </Pressable>
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
    borderBottomWidth: 1,
    borderBottomColor: '#ACACAC',
  },
  buttonActiveView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderBottomWidth: 6,
    borderBottomColor: '#FFD54A',
    marginBottom: -3,
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  buttonActiveText: {
    color: '#FFD54A',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  buttonText: {
    color: '#ACACAC',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: -0.3,
  },
});
