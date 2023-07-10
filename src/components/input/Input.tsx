import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

export const Input = ({
  label,
  text,
  placeholder,
  secure = false,
  onChangeText,
}: {
  label: string;
  text: string;
  placeholder: string;
  secure: boolean;
  onChangeText: (text: string) => void;
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={isFocus ? styles.focusInputContainer : styles.InputContainer}>
      <Text style={isFocus ? styles.focusLabel : styles.label}>{label}</Text>
      <TextInput
        defaultValue={text}
        placeholder={placeholder}
        placeholderTextColor={'#ACACAC'}
        style={styles.contents}
        secureTextEntry={secure}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export const TextArea = ({
  label,
  text,
  placeholder,
  onChangeText,
}: {
  label: string;
  text: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View
      style={isFocus ? styles.focusTextAreaContainer : styles.TextAreaContainer}
    >
      <Text style={isFocus ? styles.focusLabel : styles.label}>{label}</Text>
      <TextInput
        defaultValue={text}
        multiline
        placeholder={placeholder}
        placeholderTextColor={'#ACACAC'}
        style={styles.contents}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChangeText={onChangeText}
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
  label: {
    position: 'absolute',
    top: -12,
    left: 14,
    paddingHorizontal: 4,
    color: '#ACACAC',
    backgroundColor: 'white',
  },
  focusLabel: {
    position: 'absolute',
    top: -12,
    left: 14,
    paddingHorizontal: 4,
    color: '#FFD54A',
    backgroundColor: 'white',
  },
  contents: {
    paddingHorizontal: 16,
    fontSize: 16,
    color: 'black',
  },
});
