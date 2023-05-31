import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';

export const SignInScreen = ({ navigation }: { navigation: any }) => {
  const [info, setInfo] = useState({
    id: '' as string,
    password: '' as string,
  });

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
        <Button mode="contained" style={styles.button} buttonColor="#FFD54A">
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
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  image: {
    width: 105,
    height: 105,
  },
  form: {
    width: '100%',
    paddingTop: 30,
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%',
    marginTop: 18,
  },
  button: {
    height: 42,
  },
  outlineButton: {
    borderColor: '#FFD54A',
    height: 42,
  },
  heading: {
    fontWeight: '700',
    fontSize: 18,
    paddingBottom: 18,
  },
  input: {
    width: '100%',
    height: 42,
    paddingBottom: 12,
  },
});
