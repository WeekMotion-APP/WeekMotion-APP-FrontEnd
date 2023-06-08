import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { SelectEmotionScreenProps } from '../types/navigation/type';
import { headingCondition } from '../functions/headingFunction';
import { useThunkDispatch, useAppSelector, useAppDispatch } from '../redux';
import { requestEmotion } from '../functions/asyncFunctions/requestEmotion';
import { tag } from '../types/data/type';
import { setCheckedEmotion } from '../redux/slice/emotionSlice';
import { SelectEmotionButton } from '../components/buttons/SelectEmotionButton';
import { globalStyles } from '../styles/globalStyles';
import { BackCancelHeader } from '../components/headers/BackCancelHeader';

export const SelectEmotionScreen = ({
  route,
  navigation,
}: SelectEmotionScreenProps) => {
  const emotion = useAppSelector((state) => {
    return state.emotion;
  });
  const date = useAppSelector((state) => {
    return state.note.date;
  });
  const dispatch = useAppDispatch();
  const thunkDispatch = useThunkDispatch();
  const [checked, setChecked] = useState<tag[]>(
    route.params.status === 'before' ? [] : emotion.checkedEmotion
  );

  const onPressChip = (tag: tag) => {
    if (!checked.includes(tag) && checked.length < 3) {
      setChecked([...checked, tag]);
    } else {
      setChecked(
        checked.filter((item: tag) => {
          return item.tagName !== tag.tagName;
        })
      );
    }
  };

  useEffect(() => {
    thunkDispatch(requestEmotion());
  }, [thunkDispatch]);

  useEffect(() => {
    console.log(checked);

    return () => {
      dispatch(setCheckedEmotion(checked));
    };
  });

  return (
    <>
      <BackCancelHeader navigation={navigation} />
      <View style={styles.container}>
        <Image
          source={require('../assets/images/weekmotion.png')}
          style={globalStyles.main_image}
        />
        <View style={styles.headingContainer}>
          <Text style={globalStyles.heading}>
            {headingCondition(route, date)}
          </Text>
        </View>
        <View style={globalStyles.chipsBox}>
          {emotion.emotion
            .filter((tag: tag) => tag.tagCategory.seq === '1')
            .map((tag: tag, index) => (
              <Chip
                mode={checked.includes(tag) ? 'flat' : 'outlined'}
                key={index}
                style={
                  checked.includes(tag)
                    ? globalStyles.chipPink
                    : globalStyles.chipPinkBorder
                }
                textStyle={globalStyles.chipContent}
                onPress={() => onPressChip(tag)}
              >
                {tag.tagName}
              </Chip>
            ))}
        </View>
        <View style={globalStyles.chipsBox}>
          {emotion.emotion
            .filter((tag: tag) => tag.tagCategory.seq === '2')
            .map((tag: tag, index) => (
              <Chip
                mode={checked.includes(tag) ? 'flat' : 'outlined'}
                key={index}
                style={
                  checked.includes(tag)
                    ? globalStyles.chipBlue
                    : globalStyles.chipBlueBorder
                }
                textStyle={globalStyles.chipContent}
                onPress={() => onPressChip(tag)}
              >
                {tag.tagName}
              </Chip>
            ))}
        </View>
        <View style={globalStyles.chipsBox}>
          {emotion.emotion
            .filter((tag: tag) => tag.tagCategory.seq === '3')
            .map((tag: tag, index) => (
              <Chip
                mode={checked.includes(tag) ? 'flat' : 'outlined'}
                key={index}
                style={
                  checked.includes(tag)
                    ? globalStyles.chipYellow
                    : globalStyles.chipYellowBorder
                }
                textStyle={globalStyles.chipContent}
                onPress={() => onPressChip(tag)}
              >
                {tag.tagName}
              </Chip>
            ))}
        </View>
        <SelectEmotionButton navigation={navigation} route={route} />
      </View>
    </>
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
  headingContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
  },
});
