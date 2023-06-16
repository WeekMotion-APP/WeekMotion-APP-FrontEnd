import React, { Dispatch, SetStateAction } from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-paper';

export const SelectDateHeader = ({
  selected,
  setDatesPickerVisible,
}: {
  selected: { startingDay: string | undefined; endingDay: string | undefined };
  setDatesPickerVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <TouchableHighlight onPress={() => setDatesPickerVisible(true)}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/calendarIcon.png')}
        />
        <Text
          style={styles.dates}
        >{`${selected.startingDay} - ${selected.endingDay}`}</Text>
        <Image source={require('../../assets/images/calendarDropdown.png')} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 56,
    backgroundColor: 'white',
  },
  logo: {
    width: 24,
    height: 24,
  },
  dates: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
    color: 'black',
  },
});
