import React from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { DateData } from 'react-native-calendars';
import { DayProps } from 'react-native-calendars/src/calendar/day';
import { Text } from 'react-native-paper';

export const CalendarTile = ({
  date,
}: {
  date: DayProps & { date?: DateData | undefined };
}) => {
  return (
    <TouchableHighlight
      underlayColor={'white'}
      onPress={() => {
        console.log(date);
      }}
    >
      <View
        style={
          date.state === 'disabled' ? styles.disableContainer : styles.container
        }
      >
        <Text>{`${date.date?.day}`}</Text>
        <View style={styles.iconContainer}>
          {date.marking &&
            date.marking.dots?.map((dot, index) => {
              if (dot.color === '긍정') {
                return (
                  <Image
                    key={index}
                    source={require('../../assets/images/positive_emotion.png')}
                    style={styles.icon}
                  />
                );
              } else if (dot.color === '부정') {
                return (
                  <Image
                    key={index}
                    source={require('../../assets/images/negative_emotion.png')}
                    style={styles.icon}
                  />
                );
              } else {
                return (
                  <Image
                    key={index}
                    source={require('../../assets/images/etc_emotion.png')}
                    style={styles.icon}
                  />
                );
              }
            })}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 54,
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#DCDCDC',
  },
  disableContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 54,
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#DCDCDC',
    opacity: 0.5,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    marginTop: 16,
  },
  icon: {
    width: 12,
    height: 12,
  },
});
