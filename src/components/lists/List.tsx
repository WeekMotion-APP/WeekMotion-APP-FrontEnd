import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import { SelectDatesModal } from '../modals/SelectDatesModal';
import { chipColorPicker } from '../../functions/chipColorPicker';
import { useAppSelector } from '../../redux';
import { globalStyles } from '../../styles/globalStyles';
import { diary, diaryTag } from '../../types/data/type';
import { DiaryScreenProps } from '../../types/navigation/type';
import { TrashListHeader } from '../headers/TrashListHeader';
import { SelectDateHeader } from '../headers/SelectDateHeader';

export const List = ({ route, navigation }: DiaryScreenProps) => {
  const currentDiary = useAppSelector((state) => {
    return state.diary.allDiary;
  });
  const [selectedDiary, setSelectedDiary] = useState<diary[]>(currentDiary);

  //dates picker state
  const nowDate = new Date();
  const [selectedDates, setSelectedDates] = useState<{
    startingDay: string;
    endingDay: string;
  }>({
    startingDay: new Date(nowDate.getFullYear(), nowDate.getMonth(), 1)
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll('. ', '.')
      .slice(0, -1),
    endingDay: new Date()
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll('. ', '.')
      .slice(0, -1),
  });
  const [datesPickerVisible, setDatesPickerVisible] = useState(false);

  useEffect(() => {
    setSelectedDiary(currentDiary);
  }, [currentDiary]);

  useEffect(() => {
    setSelectedDates({
      startingDay: new Date(nowDate.getFullYear(), nowDate.getMonth(), 1)
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replaceAll('. ', '.')
        .slice(0, -1),
      endingDay: new Date()
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replaceAll('. ', '.')
        .slice(0, -1),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params.location]);

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
          style={styles.emotion}
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

  return (
    <>
      {route.params.location === 'trash' && (
        <TrashListHeader navigation={navigation} />
      )}
      <SelectDateHeader
        selected={selectedDates}
        setDatesPickerVisible={setDatesPickerVisible}
      />
      {selectedDiary &&
      selectedDiary.filter((diary: diary) => {
        return (
          Number(diary.diaryDate.replaceAll('.', '')) >=
            Number(selectedDates.startingDay.replaceAll('.', '')) &&
          Number(diary.diaryDate.replaceAll('.', '')) <=
            Number(selectedDates.endingDay.replaceAll('.', ''))
        );
      }).length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.emptyImage}
            source={require('../../assets/images/empty.png')}
          />
          <Text style={styles.emptyText}>소각장에 등록된 감정이 없어요.</Text>
        </View>
      ) : (
        <ScrollView style={globalStyles.container}>
          {selectedDiary
            .filter((diary: diary) => {
              return (
                Number(diary.diaryDate.replaceAll('.', '')) >=
                  Number(selectedDates.startingDay.replaceAll('.', '')) &&
                Number(diary.diaryDate.replaceAll('.', '')) <=
                  Number(selectedDates.endingDay.replaceAll('.', ''))
              );
            })
            .map((diary: diary, index) => (
              <TouchableHighlight
                key={index}
                underlayColor={'white'}
                onPress={() =>
                  navigation.navigate('Post', {
                    location:
                      route.params.location === 'calendar'
                        ? 'calendar'
                        : 'trash',
                    postId: diary.seq,
                  })
                }
              >
                <View style={styles.listItem}>
                  <View style={styles.listItemHeaderGroup}>
                    <Text style={globalStyles.dateText}>{diary.diaryDate}</Text>
                    <View style={styles.emotionGroup}>
                      {diary.tags.map((tag: diaryTag, index) =>
                        emotionIconPicker(tag.tag.tagCategorySeq, index)
                      )}
                    </View>
                  </View>
                  <Text style={globalStyles.heading}>{diary.title}</Text>
                  <View style={styles.chipGroup}>
                    {diary.tags.map((tag: diaryTag, index) => (
                      <View
                        key={index}
                        style={chipColorPicker(tag.tag.tagCategorySeq)}
                      >
                        <Text style={globalStyles.chipContent}>
                          {tag.tag.tagName}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableHighlight>
            ))}
        </ScrollView>
      )}
      <SelectDatesModal
        setSelectedDates={setSelectedDates}
        visible={datesPickerVisible}
        setVisible={setDatesPickerVisible}
      />
    </>
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
  emptyContainer: {
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  emptyImage: {
    width: 93,
    height: 71,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
});
