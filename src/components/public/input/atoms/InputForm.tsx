import React, { Dispatch, SetStateAction } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export const InputForm = ({
  text,
  placeholder,
  secure,
  multiline,
  onChangeText,
  setIsFocus,
}: {
  text: string;
  placeholder: string;
  secure: boolean;
  multiline: boolean;
  onChangeText: (text: string) => void;
  setIsFocus: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <TextInput
      defaultValue={text}
      placeholder={placeholder}
      secureTextEntry={secure}
      multiline={multiline}
      style={styles.contents}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  contents: { paddingHorizontal: 16, fontSize: 16, color: 'black' },
});
