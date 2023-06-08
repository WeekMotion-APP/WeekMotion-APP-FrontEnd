import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Chip, Text, TextInput } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../redux';
import { setNote } from '../redux/slice/noteSlice';
import { globalStyles } from '../styles/globalStyles';
import { tag } from '../types/data/type';
import { EditScreenProps } from '../types/navigation/type';
import { chipColorPicker } from '../functions/chipColorPicker';
import { BackCancelHeader } from '../components/headers/BackCancelHeader';
import { EditButton } from '../components/buttons/EditButton';

export const EditScreen = ({ route, navigation }: EditScreenProps) => {
  const note = useAppSelector((state) => {
    return state.note;
  });
  const checkedEmotion = useAppSelector((state) => {
    return state.emotion.checkedEmotion;
  });
  const dispatch = useAppDispatch();
  const [content, setContent] = useState(
    route.params.status === 'create'
      ? {
          title: '' as string,
          content: '' as string,
          date: new Date()
            .toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .split(' ')
            .join('')
            .slice(0, -1) as string,
        }
      : note
  );

  useEffect(() => {
    return () => {
      dispatch(setNote(content));
    };
  });
  return (
    <>
      <BackCancelHeader navigation={navigation} />
      <View style={globalStyles.container}>
        <View style={styles.date}>
          <Image
            source={require('../assets/images/calendar.png')}
            style={globalStyles.icon}
          />
          <Text style={globalStyles.heading}>{content.date}</Text>
        </View>
        <View style={globalStyles.chipsBox}>
          {checkedEmotion.map((tag: tag, index) => (
            <Chip
              key={index}
              style={chipColorPicker(tag.tagCategorySeq)}
              textStyle={globalStyles.chipContent}
            >
              {tag.tagName}
            </Chip>
          ))}
          {route.params.status === 'update' && (
            <TouchableHighlight
              underlayColor={'white'}
              onPress={() => {
                navigation.navigate('SelectEmotion', { status: 'update' });
              }}
            >
              <Image source={require('../assets/images/editIcon.png')} />
            </TouchableHighlight>
          )}
        </View>
        <View style={styles.form}>
          <TextInput
            label={'Title'}
            mode="outlined"
            placeholder="제목을 입력하세요."
            style={globalStyles.input}
            contentStyle={globalStyles.inputContent}
            activeOutlineColor="#FFD54A"
            outlineColor="#DCDCDC"
            defaultValue={content.title}
            onChangeText={(text) =>
              setContent({
                ...content,
                ['title']: text,
              })
            }
          />
          <TextInput
            label={'Note'}
            mode="outlined"
            placeholder="일기 내용을 입력하세요."
            style={styles.textarea}
            activeOutlineColor="#FFD54A"
            outlineColor="#DCDCDC"
            multiline
            defaultValue={content.content}
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
    </>
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
  textarea: {
    width: '100%',
    height: 370,
    marginBottom: 16,
  },
});
