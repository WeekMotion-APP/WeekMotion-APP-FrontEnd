import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const ButtonText = ({ text }: { text: string }) => {
  return <Text style={styles.buttonText}>{text}</Text>;
};

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: 1,
  },
});
