import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';
import { SignInScreenProps } from '../types/navigation/type';
import { globalStyles } from '../styles/globalStyles';
import { requestSignIn } from '../functions/asyncFunctions/requestSignIn';
import { Input } from '../components/input/Input';

export const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const [info, setInfo] = useState({
    id: '' as string,
    password: '' as string,
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/weekmotion.png')}
        style={globalStyles.main_image}
      />
      <View style={styles.form}>
        <Text style={globalStyles.heading}>로그인</Text>
        <Input
          label="ID"
          text={info.id}
          placeholder="아이디를 입력하세요."
          onChangeText={(text) => setInfo({ ...info, ['id']: text })}
          secure={false}
        />
        <Input
          label={'PASSWORD'}
          text={info.password}
          placeholder="비밀번호를 입력하세요."
          secure={true}
          onChangeText={(text) => setInfo({ ...info, ['password']: text })}
        />
      </View>
      <View style={globalStyles.buttonGroup}>
        <Pressable
          style={globalStyles.button}
          onPress={() => requestSignIn(info, navigation)}
        >
          <Text style={globalStyles.buttonContent}>로그인</Text>
        </Pressable>
        <Pressable
          style={globalStyles.outlineButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={globalStyles.outlineButtonContent}>회원가입</Text>
        </Pressable>
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
  form: {
    width: '100%',
  },
});
