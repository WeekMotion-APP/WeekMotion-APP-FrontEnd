import React, { useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { chipColorPicker } from '../../functions/chipColorPicker';
import { useAppSelector } from '../../redux';
import { globalStyles } from '../../styles/globalStyles';
import { diary, diaryTag } from '../../types/data/type';
import { DiaryScreenProps } from '../../types/navigation/type';

export const List = ({ route, navigation }: DiaryScreenProps) => {
  const currentDiary = useAppSelector((state) => {
    return state.diary.allDiary;
  }).filter((diary: diary) => {
    if (route.params.location === 'calendar') {
      return diary.calenderYn === 'Y';
    } else {
      return diary.calenderYn === 'N';
    }
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

  useEffect(() => {
    console.log(route.params);
  }, [route]);
  return (
    <ScrollView style={globalStyles.container}>
      {currentDiary.map((diary: diary, index) => (
        <TouchableHighlight
          key={index}
          underlayColor={'white'}
          onPress={() =>
            navigation.navigate('Post', {
              location:
                route.params.location === 'calendar' ? 'calendar' : 'trash',
              postId: diary.seq,
            })
          }
        >
          <View style={styles.listItem}>
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
        </TouchableHighlight>
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
