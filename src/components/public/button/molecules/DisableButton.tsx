import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ButtonText } from '../atoms/ButtonText';

export const DisableButton = ({
  text,
  onPress,
}: {
  text: string;
  onPress: () => Promise<void> | Dispatch<SetStateAction<any>>;
}) => {
  return (
    <Pressable style={styles.disableButton} onPress={onPress}>
      <ButtonText text={text} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  disableButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DCDCDC',
  },
});
