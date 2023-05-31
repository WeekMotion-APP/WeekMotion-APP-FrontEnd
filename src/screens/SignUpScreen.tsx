import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';

export const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [info, setInfo] = useState({
    id: '',
    verify_id: false,
    password: '',
    verify_password: '',
    name: '',
    phone: '',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>회원가입</Text>
      <View style={styles.verify_id_form}>
        <TextInput
          label={'ID'}
          mode="outlined"
          placeholder="아이디를 입력하세요."
          onChangeText={(text) => setInfo({ ...info, ['id']: text })}
          style={styles.verify_id_form_input}
          activeOutlineColor="#FFD54A"
          outlineColor="#DCDCDC"
        />
        <Button
          mode="contained"
          buttonColor="#FFD54A"
          style={styles.verify_id_form_button}
        >
          확인
        </Button>
      </View>
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
      <TextInput
        label={'PASSWORD'}
        mode="outlined"
        placeholder="비밀번호를 다시 한번 입력하세요."
        secureTextEntry={true}
        onChangeText={(text) => setInfo({ ...info, ['verify_password']: text })}
        style={styles.input}
        activeOutlineColor="#FFD54A"
        outlineColor="#DCDCDC"
      />
      <TextInput
        label={'이름'}
        mode="outlined"
        placeholder="이름을 입력하세요."
        onChangeText={(text) => setInfo({ ...info, ['name']: text })}
        style={styles.input}
        activeOutlineColor="#FFD54A"
        outlineColor="#DCDCDC"
      />
      <TextInput
        label={'휴대폰 번호'}
        mode="outlined"
        placeholder="휴대폰 번호를 숫자만 입력해주세요."
        onChangeText={(text) => setInfo({ ...info, ['phone']: text })}
        style={styles.input}
        activeOutlineColor="#FFD54A"
        outlineColor="#DCDCDC"
      />
      <View style={styles.btnGroup}>
        <Button mode="contained" style={styles.button} buttonColor="#FFD54A">
          가입하기
        </Button>
        <Button
          mode="outlined"
          style={styles.outlineButton}
          textColor="#FFD54A"
          onPress={() => navigation.goBack()}
        >
          돌아가기
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
    backgroundColor: 'white',
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
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
  verify_id_form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  verify_id_form_input: {
    width: '70%',
    height: 42,
    paddingBottom: 12,
  },
  verify_id_form_button: {
    width: '28%',
    height: 42,
    marginLeft: 6,
  },
});
