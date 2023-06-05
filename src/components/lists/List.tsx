import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { chipColorPicker } from '../../functions/chipColorPicker';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setSelectDateDiary } from '../../redux/slice/diarySlice';
import { globalStyles } from '../../styles/globalStyles';
import { diary, diaryTag } from '../../types/data/type';

export const List = () => {
  const currentDateDiary = useAppSelector((state) => {
    return state.diary.selectDateDiary;
  });

  const emotionIconPicker = (seq: string, index: number) => {
    if (seq === '1') {
      return (
        <Image
          key={index}
          style={styles.emotion}
          source={require('../../assets/images/positive_emotion.png')}
        />
      );
    } else if (seq === '2') {
      return (
        <Image
          key={index}
          source={require('../../assets/images/negative_emotion.png')}
        />
      );
    } else {
      return (
        <Image
          key={index}
          style={styles.emotion}
          source={require('../../assets/images/etc_emotion.png')}
        />
      );
    }
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSelectDateDiary(['2023-06-03', '2023-06-05']));
  }, [dispatch]);
  return (
    <ScrollView style={globalStyles.container}>
      {currentDateDiary.map((diary: diary, index) => (
        <View key={index} style={styles.listItem}>
          <View style={styles.listItemHeaderGroup}>
            <Text style={globalStyles.dateText}>
              {diary.modDate.slice(0, -14)}
            </Text>
            <View style={styles.emotionGroup}>
              {diary.tags.map((tag: diaryTag, index) =>
                emotionIconPicker(tag.tag.tagCategorySeq, index)
              )}
            </View>
          </View>
          <Text style={globalStyles.heading}>{diary.title}</Text>
          <View style={styles.chipGroup}>
            {diary.tags.map((tag: diaryTag, index) => (
              <Chip
                key={index}
                style={chipColorPicker(tag.tag.tagCategorySeq)}
                textStyle={globalStyles.chipContent}
              >
                {tag.tag.tagName}
              </Chip>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 120,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  listItemHeaderGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emotionGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 8,
    gap: 3,
  },
  emotion: {
    width: 12,
    height: 12,
    resizeMode: 'cover',
  },
  chipGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    width: '100%',
    marginBottom: 16,
  },
});
