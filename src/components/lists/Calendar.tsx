import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { useAppSelector } from '../../redux';
import { diary, diaryTag } from '../../types/data/type';
import { CalendarArrow, CalendarTitle } from '../headers/CalendarHeader';
import { CalendarTile } from '../tiles/CalendarTile';

export const Calendar = () => {
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
  return (
    <View style={styles.container}>
      <RNCalendar
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#DCDCDC',
        }}
        markingType="multi-dot"
        markedDates={dots}
        renderHeader={(date) => <CalendarTitle date={date} />}
        renderArrow={(direction) => <CalendarArrow direction={direction} />}
        dayComponent={(date) => <CalendarTile date={date} />}
        theme={{
          weekVerticalMargin: 0,
          todayTextColor: 'black',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
