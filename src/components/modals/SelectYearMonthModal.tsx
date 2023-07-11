import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Portal } from 'react-native-paper';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { ModalButton } from '../buttons/ModalButton';

export const SelectYearMonthModal = ({
  visible,
  setVisible,
  currentDate,
  setCurrentDate,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  currentDate: { year: number; month: string };
  setCurrentDate: Dispatch<SetStateAction<{ year: number; month: string }>>;
}) => {
  const [currentCategory, setCurrentCategory] = useState('year');
  const [selectedDate, setSelectedDate] = useState({
    year: currentDate.year,
    month: currentDate.month,
  });
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={globalStyles.modal}
        contentContainerStyle={styles.modalContent}
      >
        <View style={styles.modalHeader}>
          <TouchableHighlight
            underlayColor={'white'}
            onPress={() => setCurrentCategory('year')}
          >
            <View style={styles.modalCategory}>
              <Text
                style={
                  currentCategory === 'year'
                    ? styles.abledCategory
                    : styles.disabledCategory
                }
              >
                {`${currentDate.year}년`}
              </Text>
              <Image
                style={globalStyles.icon}
                source={require('../../assets/images/calendarDropdown.png')}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'white'}
            onPress={() => setCurrentCategory('month')}
          >
            <View style={styles.modalCategory}>
              <Text
                style={
                  currentCategory === 'month'
                    ? styles.abledCategory
                    : styles.disabledCategory
                }
              >
                {`${
                  currentDate.month[0] === '0'
                    ? currentDate.month.slice(-1)
                    : currentDate.month
                }월`}
              </Text>
              <Image
                style={globalStyles.icon}
                source={require('../../assets/images/calendarDropdown.png')}
              />
            </View>
          </TouchableHighlight>
        </View>
        <ScrollView style={styles.dateContainer}>
          {currentCategory === 'year'
            ? yearData.map((year: number, index) => (
                <TouchableHighlight
                  key={index}
                  onPress={() =>
                    setSelectedDate({ ...selectedDate, ['year']: year })
                  }
                >
                  <View
                    style={
                      selectedDate.year === year
                        ? styles.selectedDateView
                        : styles.dateView
                    }
                  >
                    <Text>{`${year}년`}</Text>
                    {selectedDate.year === year && (
                      <Image
                        style={globalStyles.icon}
                        source={require('../../assets/images/checkIcon.png')}
                      />
                    )}
                  </View>
                </TouchableHighlight>
              ))
            : monthData.map((month: number, index) => (
                <TouchableHighlight
                  key={index}
                  onPress={() =>
                    setSelectedDate({
                      ...selectedDate,
                      ['month']: String(month),
                    })
                  }
                >
                  <View
                    style={
                      selectedDate.month === String(month)
                        ? styles.selectedDateView
                        : styles.dateView
                    }
                  >
                    <Text>{`${month}월`}</Text>
                    {selectedDate.month === String(month) && (
                      <Image
                        style={globalStyles.icon}
                        source={require('../../assets/images/checkIcon.png')}
                      />
                    )}
                  </View>
                </TouchableHighlight>
              ))}
        </ScrollView>
        <View style={styles.modalButtonGroup}>
          <ModalButton
            mode="outline"
            text="취소"
            onPress={() => setVisible(false)}
          />
          <ModalButton
            mode="contain"
            text="확인"
            onPress={() => {
              setCurrentDate(selectedDate);
              setVisible(false);
            }}
          />
        </View>
      </Modal>
    </Portal>
  );
};

const yearData: number[] = [
  2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028,
];

const monthData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 16,
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  modalCategory: {
    display: 'flex',
    flexDirection: 'row',
  },
  abledCategory: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    lineHeight: 25,
  },
  disabledCategory: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ACACAC',
    lineHeight: 25,
  },
  dateContainer: {
    height: '50%',
  },
  dateView: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
  selectedDateView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 48,
    backgroundColor: '#FFD54A',
    paddingLeft: 20,
    paddingRight: 20,
  },
  modalButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 8,
    paddingTop: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
