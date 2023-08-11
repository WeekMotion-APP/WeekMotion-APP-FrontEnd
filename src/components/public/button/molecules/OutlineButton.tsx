import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { OutlineButtonText } from '../atoms/OutlineButtonText';

export const OutlineButton = ({
  text,
  onPress,
}: {
  text: string;
  onPress: () => Promise<void> | Dispatch<SetStateAction<any>>;
}) => {
  return (
    <Pressable style={styles.outlineButton} onPress={onPress}>
      <OutlineButtonText text={text} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outlineButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#FFD54A',
  },
});
