import React, { useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { SelectEmotionScreenProps } from '../types/navigation/type';
import { headingCondition } from '../functions/headingFunc';
import { useThunkDispatch, useAppSelector } from '../redux';
import { requestEmotion } from '../functions/asyncFunctions/requestEmotion';
import { tag } from '../types/data/type';

export const SelectEmotionScreen = ({ route }: SelectEmotionScreenProps) => {
  const thunkDispatch = useThunkDispatch();
  const emotion = useAppSelector((state) => {
    return state.emotion.emotion;
  });

  useEffect(() => {
    thunkDispatch(requestEmotion());
  }, [thunkDispatch]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/weekmotion.png')}
        style={styles.image}
      />
      <Text>{headingCondition(route)}</Text>
      <View style={styles.chipsBox}>
        {emotion
          .filter((tag: tag) => tag.tagCategory.seq === '1')
          .map((tag: tag, index) => (
            <Chip mode="outlined" key={index} style={styles.chip}>
              {tag.tagName}
            </Chip>
          ))}
      </View>
      <View style={styles.chipsBox}>
        {emotion
          .filter((tag: tag) => tag.tagCategory.seq === '2')
          .map((tag: tag, index) => (
            <Chip mode="outlined" key={index} style={styles.chip}>
              {tag.tagName}
            </Chip>
          ))}
      </View>
      <View style={styles.chipsBox}>
        {emotion
          .filter((tag: tag) => tag.tagCategory.seq === '3')
          .map((tag: tag, index) => (
            <Chip mode="outlined" key={index} style={styles.chip}>
              {tag.tagName}
            </Chip>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    width: 140,
    height: 140,
  },
  chipsBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  chip: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 69,
    height: 28,
    fontSize: 16,
    backgroundColor: 'white',
    // paddingTop: 6,
    // paddingBottom: 6,
    // paddingLeft: 12,
    // paddingRight: 12,
  },
});
