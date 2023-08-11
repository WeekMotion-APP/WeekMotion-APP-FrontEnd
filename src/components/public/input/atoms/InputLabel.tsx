import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const InputLabel = ({
  label,
  isFocus,
}: {
  label: string;
  isFocus: boolean;
}) => {
  return (
    <Text style={isFocus ? styles.focusLabel : styles.label}>{label}</Text>
  );
};

const styles = StyleSheet.create({
  focusLabel: {
    position: 'absolute',
    top: -12,
    left: 14,
    paddingHorizontal: 4,
    color: '#FFD54A',
    backgroundColor: 'white',
  },
  label: {
    position: 'absolute',
    top: -12,
    left: 14,
    paddingHorizontal: 4,
    color: '#ACACAC',
    backgroundColor: 'white',
  },
});
