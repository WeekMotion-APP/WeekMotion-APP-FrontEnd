import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
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
        <Button
          mode="contained"
          style={globalStyles.button}
          contentStyle={globalStyles.buttonContent}
          onPress={() => requestSignIn(info, navigation)}
        >
          로그인
        </Button>
        <Button
          mode="outlined"
          style={globalStyles.outlineButton}
          contentStyle={globalStyles.outlineButtonContent}
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
  form: {
    width: '100%',
  },
});
