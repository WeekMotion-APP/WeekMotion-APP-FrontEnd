import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const OutlineButtonText = ({ text }: { text: string }) => {
  return <Text style={styles.outlineButtonText}>{text}</Text>;
};

const styles = StyleSheet.create({
  outlineButtonText: {
    color: '#FFD54A',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: 1,
  },
});
