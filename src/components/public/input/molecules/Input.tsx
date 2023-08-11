import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputForm } from '../atoms/InputForm';
import { InputLabel } from '../atoms/InputLabel';

export const Input = ({
  label,
  text,
  placeholder,
  secure = false,
  multiline = false,
  onChangeText,
}: {
  label: string;
  text: string;
  placeholder: string;
  secure: boolean;
  multiline: boolean;
  onChangeText: (text: string) => void;
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View
      style={
        isFocus
          ? multiline
            ? styles.focusTextAreaContainer
            : styles.focusInputContainer
          : multiline
          ? styles.TextAreaContainer
          : styles.InputContainer
      }
    >
      <InputLabel label={label} isFocus={isFocus} />
      <InputForm
        text={text}
        placeholder={placeholder}
        secure={secure}
        multiline={multiline}
        onChangeText={onChangeText}
        setIsFocus={setIsFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    position: 'relative',
    width: '100%',
    height: 56,
    marginBottom: 16,
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#DCDCDC',
  },
  focusInputContainer: {
    position: 'relative',
    width: '100%',
    height: 56,
    marginBottom: 16,
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#FFD54A',
  },
  TextAreaContainer: {
    position: 'relative',
    width: '100%',
    height: 370,
    marginBottom: 16,
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#DCDCDC',
  },
  focusTextAreaContainer: {
    position: 'relative',
    width: '100%',
    height: 370,
    marginBottom: 16,
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#FFD54A',
  },
});
