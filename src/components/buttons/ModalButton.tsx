import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export const ModalButton = ({
  mode,
  text,
  onPress,
}: {
  mode: string;
  text: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      style={mode === 'contain' ? styles.containButton : styles.outlineButton}
      onPress={onPress}
    >
      <Text
        style={
          mode === 'contain'
            ? styles.containButtonText
            : styles.outlineButtonText
        }
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#FFD54A',
    borderRadius: 20,
  },
  containButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 1,
  },
  outlineButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#FFD54A',
    borderRadius: 20,
  },
  outlineButtonText: {
    color: '#FFD54A',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 1,
  },
});
