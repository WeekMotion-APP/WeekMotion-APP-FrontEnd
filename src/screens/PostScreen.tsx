import React, { useState } from 'react';
import { useAppSelector } from '../redux';
import { diary, diaryTag, tag } from '../types/data/type';
import { Image, StyleSheet, View, Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { globalStyles } from '../styles/globalStyles';
import { PostButton } from '../components/buttons/PostButton';
import { PostScreenProps } from '../types/navigation/type';
import { ToCalendarModal } from '../components/modals/ToCalendarModal';
import { ToTrashModal } from '../components/modals/ToTrashModal';
import { _DeleteModal } from '../components/modals/_DeleteModal';
import { chipColorPicker } from '../functions/chipColorPicker';
import { BackCancelHeader } from '../components/headers/BackCancelHeader';
import { BackEditHeader } from '../components/headers/BackEditHeader';
import { ResetModal } from '../components/modals/ResetModal';

export const PostScreen = ({ route, navigation }: PostScreenProps) => {
  const [modalVisible, setModalVisible] = useState({
    toCalendar: false,
    toTrash: false,
    cancel: false,
    delete: false,
  });
  const note = useAppSelector((state) => {
    return state.note;
  });
  const checkedEmotion = useAppSelector((state) => {
    return state.emotion.checkedEmotion;
  });
  const selectedCalendarNote = useAppSelector((state) => {
    if (!state.diary.allDiary) {
      return;
    }
    return state.diary.allDiary.find((post: diary) => {
      return post.seq === route.params.postId;
    });
  });
  return (
    <>
      <PaperProvider>
        {route.params.location === 'created' ? (
          <BackCancelHeader
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            route={route}
            navigation={navigation}
          />
        ) : (
          <BackEditHeader route={route} navigation={navigation} />
        )}
        <View style={globalStyles.container}>
          <View style={styles.date}>
            <Image
              source={require('../assets/images/calendar.png')}
              style={globalStyles.icon}
            />
            <Text style={styles.heading}>{`${
              route.params.postId ? selectedCalendarNote?.diaryDate : note.date
            } 의 감정`}</Text>
          </View>
          <View style={globalStyles.chipsBox}>
            {route.params.postId
              ? selectedCalendarNote?.tags.map((tag: diaryTag, index) => (
                  <View
                    key={index}
                    style={chipColorPicker(tag.tag.tagCategorySeq)}
                  >
                    <Text style={globalStyles.chipContent}>
                      {tag.tag.tagName}
                    </Text>
                  </View>
                ))
              : checkedEmotion.map((tag: tag, index) => (
                  <View key={index} style={chipColorPicker(tag.tagCategorySeq)}>
                    <Text style={globalStyles.chipContent}>{tag.tagName}</Text>
                  </View>
                ))}
          </View>
          <Text style={globalStyles.heading}>
            {route.params.postId ? selectedCalendarNote?.title : note.title}
          </Text>
          <Text style={globalStyles.text}>
            {route.params.postId
              ? selectedCalendarNote?.contents
              : note.content}
          </Text>
          <PostButton
            route={route}
            navigation={navigation}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
        {route.params.location === 'created' && (
          <>
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
            <ResetModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              navigation={navigation}
            />
          </>
        )}
        {route.params.location === 'trash' && (
          <_DeleteModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            route={route}
            navigation={navigation}
          />
        )}
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  date: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  heading: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 36,
    marginBottom: 4,
    color: 'black',
  },
});
