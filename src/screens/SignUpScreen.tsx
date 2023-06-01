import React, { useState } from 'react';
import axios from 'axios';
import { requestURL } from '../../requestURL';
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
  const validationId: RegExp = /^[0-9a-zA-Z]+$/;
  const validationName: RegExp = /^[가-힣a-zA-Z\s]+$/;
  const validationPhone: RegExp = /^[0-9]+$/;

  const verifyIdRequest = async (id: string) => {
    try {
      const response = await axios.get(`/user/check/id/${id}`, {
        baseURL: requestURL,
      });
      if (response.data.data.duplication === false) {
        setInfo({ ...info, ['verify_id']: true });
      } else {
        throw new Error('중복된 아이디가 존재합니다.');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signUpRequest = async () => {
    try {
      await verifyIdRequest(info.id);
      if (!info.verify_id) {
        throw new Error('아이디 중복확인을 해주세요.');
      }
      if (
        Object.values(info).find((value: string | boolean) => {
          return typeof value === 'string'
            ? value.length === 0
            : value === false;
        }) !== undefined
      ) {
        throw new Error('작성하지 않은 항목이 있습니다.');
      }
      if (!info.verify_id || info.password !== info.verify_password) {
        throw new Error('아이디 또는 비밀번호를 확인해주세요.');
      }
      const response = await axios.post(
        '/user',
        {
          id: info.id,
          password: info.password,
          name: info.name,
          email: undefined,
          phone: info.phone,
        },
        { baseURL: requestURL }
      );
      if (response.status === 201) {
        console.error('회원가입 성공!');
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>회원가입</Text>
      <View style={styles.verify_id_form}>
        <TextInput
          label={'ID'}
          mode="outlined"
          placeholder="아이디를 입력하세요."
          onChangeText={(text) => setInfo({ ...info, ['id']: text })}
          onBlur={() => {
            if (info.id.length > 0 && !validationId.test(info.id)) {
              console.error('아이디 형식을 확인해주세요.');
            }
          }}
          style={styles.verify_id_form_input}
          activeOutlineColor="#FFD54A"
          outlineColor="#DCDCDC"
        />
        <Button
          mode="contained"
          buttonColor="#FFD54A"
          style={styles.verify_id_form_button}
          onPress={() => verifyIdRequest(info.id)}
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
        onBlur={() => {
          if (info.name.length > 0 && !validationName.test(info.name)) {
            console.error('이름 형식을 확인해주세요.');
          }
        }}
        style={styles.input}
        activeOutlineColor="#FFD54A"
        outlineColor="#DCDCDC"
      />
      <TextInput
        label={'휴대폰 번호'}
        mode="outlined"
        placeholder="휴대폰 번호를 '-'을 제외한 숫자만 입력해주세요."
        onChangeText={(text) => setInfo({ ...info, ['phone']: text })}
        onBlur={() => {
          if (info.phone.length > 0 && !validationPhone.test(info.phone)) {
            console.error('휴대폰 번호 형식을 확인해주세요.');
          }
        }}
        style={styles.input}
        activeOutlineColor="#FFD54A"
        outlineColor="#DCDCDC"
      />
      <View style={styles.btnGroup}>
        <Button
          mode="contained"
          style={styles.button}
          buttonColor="#FFD54A"
          onPress={signUpRequest}
        >
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
