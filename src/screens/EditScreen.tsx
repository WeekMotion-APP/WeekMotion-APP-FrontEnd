import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../redux';
import { setNote } from '../redux/slice/noteSlice';
import { globalStyles } from '../styles/globalStyles';
import { tag } from '../types/data/type';
import { EditScreenProps } from '../types/navigation/type';

export const EditScreen = ({ navigation }: EditScreenProps) => {
  const checkedEmotion = useAppSelector((state) => {
    return state.emotion.checkedEmotion;
  });
  const dispatch = useAppDispatch();
  const [content, setContent] = useState({
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

  useEffect(() => {
    return () => {
      dispatch(setNote(content));
    };
  });
  return (
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
            style={chipColorPicker(tag)}
            textStyle={globalStyles.chipContent}
          >
            {tag.tagName}
          </Chip>
        ))}
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
          onChangeText={(text) =>
            setContent({
              ...content,
              ['content']: text,
            })
          }
        />
      </View>
      <Button
        mode="contained"
        style={globalStyles.button}
        contentStyle={globalStyles.buttonContent}
        buttonColor="#FFD54A"
        onPress={() =>
          navigation.navigate('SelectEmotion', {
            status: 'after',
          })
        }
      >
        다음
      </Button>
    </View>
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
