import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars';
import { useAppSelector } from '../../redux';
import { diary, diaryTag } from '../../types/data/type';
import { CalendarArrow, CalendarTitle } from '../headers/CalendarHeader';
import { SelectYearMonthModal } from '../modals/SelectYearMonthModal';
import { CalendarTile } from '../tiles/CalendarTile';

LocaleConfig.locales.kr = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'kr';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState({
    year: new Date().getFullYear(),
    month: ('0' + String(new Date().getMonth() + 1)).slice(-2),
  });
  const [yearMonthModalVisible, setYearMonthModalVisible] = useState(false);
  const diary = useAppSelector((state) => {
    return state.diary.allDiary;
  });
  const dots = diary
    .filter((post: diary) => {
      return post.calenderYn === 'Y';
    })
    .reduce((acc: any, cur: diary) => {
      acc[cur.modDate.slice(0, -14)] = {
        ['dots']: cur.tags.map((tag: diaryTag) => {
          return { ['color']: tag.tag.tagCategory.tagCategoryName };
        }),
      };
      return acc;
    }, {});
  useEffect(() => {
    console.log(currentDate);
  });
  return (
    <View style={styles.container}>
      <RNCalendar
        initialDate={`${currentDate.year}-${currentDate.month}`}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#DCDCDC',
        }}
        markingType="multi-dot"
        markedDates={dots}
        renderHeader={(date) => (
          <CalendarTitle date={date} setVisible={setYearMonthModalVisible} />
        )}
        renderArrow={(direction) => <CalendarArrow direction={direction} />}
        dayComponent={(date) => <CalendarTile date={date} />}
        theme={{
          weekVerticalMargin: 0,
          todayTextColor: 'black',
        }}
      />
      <SelectYearMonthModal
        visible={yearMonthModalVisible}
        setVisible={setYearMonthModalVisible}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
