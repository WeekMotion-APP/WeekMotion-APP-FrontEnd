import React, { Dispatch, SetStateAction } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

export const CalendarTitle = ({
  date,
  setVisible,
}: {
  date: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <TouchableHighlight
      underlayColor={'white'}
      onPress={() => setVisible(true)}
    >
      <View style={styles.titleContainer}>
        <Image
          style={styles.calendarLogo}
          source={require('../../assets/images/calendarIcon.png')}
        />
        <Text style={styles.calendarTitle}>{`${new Date(
          date
        ).getFullYear()}년 ${new Date(date).getMonth() + 1}월`}</Text>
        <Image
          style={globalStyles.icon}
          source={require('../../assets/images/calendarDropdown.png')}
        />
      </View>
    </TouchableHighlight>
  );
};

export const ModalCalendarHeader = ({ date }: { date: string }) => {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.calendarTitle}>{`${new Date(
          date
        ).getFullYear()}년 ${new Date(date).getMonth() + 1}월`}</Text>
      </View>
    </>
  );
};

export const CalendarArrow = ({ direction }: { direction: string }) => {
  if (direction === 'left') {
    return (
      <Image
        style={globalStyles.icon}
        source={require('../../assets/images/backIcon.png')}
      />
    );
  } else {
    return (
      <Image
        style={globalStyles.icon}
        source={require('../../assets/images/forwardIcon.png')}
      />
    );
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
    color: 'black',
  },
});
