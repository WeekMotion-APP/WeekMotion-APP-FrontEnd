import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux';
import { setNote } from '../redux/slice/noteSlice';
import { globalStyles } from '../styles/globalStyles';
import { tag } from '../types/data/type';
import { EditScreenProps } from '../types/navigation/type';
import { chipColorPicker } from '../functions/chipColorPicker';
import { BackCancelHeader } from '../components/headers/BackCancelHeader';
import { EditButton } from '../components/buttons/EditButton';
import { Input, TextArea } from '../components/input/Input';

export const EditScreen = ({ route, navigation }: EditScreenProps) => {
  const note = useAppSelector((state) => {
    return state.note;
  });
  const checkedEmotion = useAppSelector((state) => {
    return state.emotion.checkedEmotion;
  });
  const dispatch = useAppDispatch();
  const [content, setContent] = useState(note);

  useEffect(() => {
    return () => {
      dispatch(setNote(content));
    };
  });
  return (
    <SafeAreaView>
      <BackCancelHeader
        route={route}
        navigation={navigation}
        modalVisible={undefined}
        setModalVisible={undefined}
      />
      <View style={globalStyles.container}>
        <View style={styles.date}>
          <Image
            source={require('../assets/images/calendar.png')}
            style={globalStyles.icon}
          />
          <Text style={styles.heading}>{content.date}</Text>
        </View>
        <View style={globalStyles.chipsBox}>
          {checkedEmotion.map((tag: tag, index) => (
            <View key={index} style={chipColorPicker(tag.tagCategorySeq)}>
              <Text style={globalStyles.chipContent}>{tag.tagName}</Text>
            </View>
          ))}
          {route.params.status === 'update' && (
            <TouchableHighlight
              underlayColor={'white'}
              onPress={() => {
                navigation.navigate('SelectEmotion', {
                  status: 'update',
                  date: 'selectedDay',
                });
              }}
            >
              <Image
                style={globalStyles.icon}
                source={require('../assets/images/editIcon.png')}
              />
            </TouchableHighlight>
          )}
        </View>
        <View style={styles.form}>
          <Input
            label={'Title'}
            text={content.title}
            placeholder="제목을 입력하세요."
            onChangeText={(text) =>
              setContent({
                ...content,
                ['title']: text,
              })
            }
            secure={false}
          />
          <TextArea
            label={'Note'}
            placeholder="일기 내용을 입력하세요."
            text={content.content}
            onChangeText={(text) =>
              setContent({
                ...content,
                ['content']: text,
              })
            }
          />
        </View>
        <EditButton content={content} route={route} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
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
