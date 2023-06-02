import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { requestURL } from '../../requestURL';
import { SignInScreenProps } from '../types/navigation/type';

export const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const [info, setInfo] = useState({
    id: '' as string,
    password: '' as string,
  });

  const setOnStorage = async (value: {
    accessToken: string;
    refreshToken: string;
  }) => {
    try {
      await AsyncStorage.setItem('accessToken', value.accessToken);
      await AsyncStorage.setItem('refreshToken', value.refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  const signInRequest = async () => {
    try {
      const response = await axios.post(
        '/auth/login',
        {
          id: info.id,
          password: info.password,
        },
        { baseURL: requestURL }
      );
      if (response.status === 201) {
        setOnStorage(response.data.data);
        console.error('로그인 성공!');
        navigation.navigate('SelectEmotion', {
          status: 'before',
          date: 'today',
        });
      }
    } catch (error) {
      console.error('아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/weekmotion.png')}
        style={styles.image}
      />
      <View style={styles.form}>
        <Text style={styles.heading}>로그인</Text>
        <TextInput
          label={'ID'}
          mode="outlined"
          placeholder="아이디를 입력하세요."
          onChangeText={(text) => setInfo({ ...info, ['id']: text })}
          style={styles.input}
          activeOutlineColor="#FFD54A"
          outlineColor="#DCDCDC"
        />
        <TextInput
          label={'PASSWORD'}
          mode="outlined"
          placeholder="비밀번호를 입력하세요."
          secureTextEntry={true}
          onChangeText={(text) => setInfo({ ...info, ['password']: text })}
          style={styles.input}
          activeOutlineColor="#FFD54A"
          outlineColor="#DCDCDC"
        />
      </View>
      <View style={styles.btnGroup}>
        <Button
          mode="contained"
          style={styles.button}
          buttonColor="#FFD54A"
          onPress={signInRequest}
        >
          로그인
        </Button>
        <Button
          mode="outlined"
          style={styles.outlineButton}
          textColor="#FFD54A"
          onPress={() => navigation.navigate('SignUp')}
        >
          회원가입
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    width: 140,
    height: 140,
  },
  form: {
    width: '100%',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
    marginTop: 24,
  },
  button: {
    height: 56,
  },
  outlineButton: {
    borderColor: '#FFD54A',
    height: 56,
  },
  heading: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 56,
    marginBottom: 16,
  },
});
