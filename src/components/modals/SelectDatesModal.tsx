import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Button, Modal, Portal } from 'react-native-paper';
import { View } from 'react-native';
import { Calendar as RNCalendar, CalendarUtils } from 'react-native-calendars';
import { globalStyles } from '../../styles/globalStyles';
import { CalendarArrow, ModalCalendarHeader } from '../headers/CalendarHeader';

export const SelectDatesModal = ({
  setSelectedDates,
  visible,
  setVisible,
}: {
  setSelectedDates: Dispatch<
    SetStateAction<{
      startingDay: string;
      endingDay: string;
    }>
  >;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selected, setSelected] = useState<{
    startingDay: string | undefined;
    endingDay: string | undefined;
  }>({
    startingDay: undefined,
    endingDay: undefined,
  });
  const getDate = (count: number, startingDay: string) => {
    const startDate = new Date(startingDay);
    const newDate = startDate.setDate(startDate.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };
  const marked = useMemo(() => {
    if (!selected.startingDay && !selected.endingDay) {
      return;
    } else if (selected.startingDay && !selected.endingDay) {
      return {
        [selected.startingDay]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: '#FFD54A',
          selectedTextColor: 'red',
        },
      };
    } else {
      let markedDates = {
        [selected.startingDay!]: {
          startingDay: true,
          color: '#FFD54A',
          textColor: 'red',
        },
      };
      const dateCount =
        new Date(selected.endingDay!).getDate() -
        new Date(selected.startingDay!).getDate() -
        1;
      for (let i = 1; i <= dateCount; i++) {
        markedDates = {
          ...markedDates,
          [getDate(i, selected.startingDay!)]: { color: '#FFE388' },
        };
      }
      markedDates = {
        ...markedDates,
        [selected.endingDay!]: {
          endingDay: true,
          color: '#FFD54A',
          textColor: 'red',
        },
      };
      return markedDates;
    }
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
          markingType={selected.endingDay ? 'period' : 'custom'}
          renderHeader={(date) => <ModalCalendarHeader date={date} />}
          renderArrow={(direction) => <CalendarArrow direction={direction} />}
          markedDates={marked}
          onDayPress={(date) => {
            if (!selected.startingDay && !selected.endingDay) {
              setSelected({ ...selected, ['startingDay']: date.dateString });
            } else if (selected.startingDay && !selected.endingDay) {
              if (new Date(date.dateString) < new Date(selected.startingDay)) {
                return;
              }
              setSelected({ ...selected, ['endingDay']: date.dateString });
            } else {
              setSelected({
                ['startingDay']: date.dateString,
                ['endingDay']: undefined,
              });
            }
          }}
        />
        <View style={globalStyles.modalButtonGroup}>
          <Button
            mode="outlined"
            style={{ borderColor: '#FFD54A', borderWidth: 2 }}
            textColor="#FFD54A"
            onPress={() => setVisible(false)}
          >
            취소
          </Button>
          <Button
            buttonColor="#FFD54A"
            mode="contained"
            onPress={() => {
              if (selected.startingDay && !selected.endingDay) {
                setSelectedDates({
                  startingDay: selected.startingDay.replaceAll('-', '.'),
                  endingDay: selected.startingDay.replaceAll('-', '.'),
                });
                setSelected({ startingDay: undefined, endingDay: undefined });
                setVisible(false);
              } else if (selected.startingDay && selected.endingDay) {
                setSelectedDates({
                  startingDay: selected.startingDay.replaceAll('-', '.'),
                  endingDay: selected.endingDay.replaceAll('-', '.'),
                });
                setSelected({ startingDay: undefined, endingDay: undefined });
                setVisible(false);
              } else {
                return;
              }
            }}
          >
            확인
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
