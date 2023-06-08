import React from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-paper';

export const CalendarTitle = ({ date }: { date: string }) => {
  return (
    <TouchableHighlight>
      <View style={styles.titleContainer}>
        <Image
          style={styles.calendarLogo}
          source={require('../../assets/images/calendarIcon.png')}
        />
        <Text style={styles.calendarTitle}>{`${new Date(
          date
        ).getFullYear()}년 ${new Date(date).getMonth() + 1}월`}</Text>
        <Image source={require('../../assets/images/calendarDropdown.png')} />
      </View>
    </TouchableHighlight>
  );
};

export const CalendarArrow = ({ direction }: { direction: string }) => {
  if (direction === 'left') {
    return <Image source={require('../../assets/images/backIcon.png')} />;
  } else {
    return <Image source={require('../../assets/images/forwardIcon.png')} />;
  }
};

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  calendarLogo: {
    width: 24,
    height: 24,
  },
  calendarTitle: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
  },
});
