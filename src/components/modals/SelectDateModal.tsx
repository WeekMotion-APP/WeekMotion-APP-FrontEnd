import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Modal, Portal } from 'react-native-paper';
import { View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { globalStyles } from '../../styles/globalStyles';
import { CalendarArrow, ModalCalendarHeader } from '../headers/CalendarHeader';
import { useAppDispatch } from '../../redux';
import { setNote } from '../../redux/slice/noteSlice';
import { DiaryScreenProps } from '../../types/navigation/type';
import { ModalButton } from '../buttons/ModalButton';

export const SelectDateModal = ({
  navigation,
  visible,
  setVisible,
}: {
  route: DiaryScreenProps['route'];
  navigation: DiaryScreenProps['navigation'];
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const INITIAL_DATE = new Date()
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split(' ')
    .join('')
    .replaceAll('.', '-')
    .slice(0, -1);
  const [selected, setSelected] = useState(INITIAL_DATE);
  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#FFD54A',
        selectedTextColor: 'red',
      },
    };
  }, [selected]);
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={globalStyles.modal}
        contentContainerStyle={globalStyles.modalContent}
      >
        <RNCalendar
          theme={{
            todayTextColor: 'black',
          }}
          renderHeader={(date) => <ModalCalendarHeader date={date} />}
          renderArrow={(direction) => <CalendarArrow direction={direction} />}
          onDayPress={(date) => {
            if (new Date(date.dateString) > new Date()) return;
            setSelected(date.dateString);
          }}
          markedDates={marked}
        />
        <View style={globalStyles.modalButtonGroup}>
          <ModalButton
            mode="outline"
            text="취소"
            onPress={() => {
              setVisible(!visible);
            }}
          />
          <ModalButton
            mode="contain"
            text="확인"
            onPress={() => {
              dispatch(setNote({ date: selected.replaceAll('-', '.') }));
              navigation.navigate('SelectEmotion', {
                status: 'before',
                date: 'selectedDay',
              });
              setVisible(false);
            }}
          />
        </View>
      </Modal>
    </Portal>
  );
};
