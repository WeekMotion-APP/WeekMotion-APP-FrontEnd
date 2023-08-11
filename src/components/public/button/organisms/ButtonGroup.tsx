import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native/types';
import { Button } from '../molecules/Button';
import { OutlineButton } from '../molecules/OutlineButton';

export const ButtonGroup = ({
  buttonText,
  outlineButtonText,
  onButtonPress,
  onOutlineButtonPress,
}: {
  buttonText: string;
  outlineButtonText: string;
  onButtonPress: () => Promise<void> | Dispatch<SetStateAction<any>>;
  onOutlineButtonPress: () => Promise<void> | Dispatch<SetStateAction<any>>;
}) => {
  return (
    <View style={styles.buttonGroup}>
      <Button text={buttonText} onPress={onButtonPress} />
      <OutlineButton text={outlineButtonText} onPress={onOutlineButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
    marginTop: 24,
  },
});
