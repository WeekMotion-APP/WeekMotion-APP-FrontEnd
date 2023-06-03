import React, { useState } from 'react';
import { useAppSelector } from '../redux';
import { tag } from '../types/data/type';
import { Image, StyleSheet, View } from 'react-native';
import { Text, Chip, PaperProvider } from 'react-native-paper';
import { globalStyles } from '../styles/globalStyles';
import { PostButton } from '../components/buttons/PostButton';
import { PostScreenProps } from '../types/navigation/type';
import { ToCalendarModal } from '../components/modals/ToCalendarModal';
import { ToTrashModal } from '../components/modals/ToTrashModal';

export const PostScreen = ({ route, navigation }: PostScreenProps) => {
  const [modalVisible, setModalVisible] = useState({
    toCalendar: false,
    toTrash: false,
    cancel: false,
  });
  const note = useAppSelector((state) => {
    return state.note;
  });
  const checkedEmotion = useAppSelector((state) => {
    return state.emotion.checkedEmotion;
  });
  const chipColorPicker = (tag: tag) => {
    if (tag.tagCategorySeq === '1') {
      return globalStyles.chipPink;
    } else if (tag.tagCategorySeq === '2') {
      return globalStyles.chipBlue;
    } else {
      return globalStyles.chipYellow;
    }
  };

  return (
    <PaperProvider>
      <View style={globalStyles.container}>
        <View style={styles.date}>
          <Image
            source={require('../assets/images/calendar.png')}
            style={globalStyles.icon}
          />
          <Text style={globalStyles.heading}>{`${note.date} 의 감정`}</Text>
        </View>
        <View style={globalStyles.chipsBox}>
          {checkedEmotion.map((tag: tag, index) => (
            <Chip
              key={index}
              style={chipColorPicker(tag)}
              textStyle={globalStyles.chipContent}
            >
              {tag.tagName}
            </Chip>
          ))}
        </View>
        <Text style={globalStyles.heading}>{note.title}</Text>
        <Text style={globalStyles.text}>{note.content}</Text>
        <PostButton
          route={route}
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
      <ToCalendarModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
      <ToTrashModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  date: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
