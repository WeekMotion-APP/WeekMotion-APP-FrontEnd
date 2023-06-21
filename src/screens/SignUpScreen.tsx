import React, { useState } from 'react';
import axios from 'axios';
import { requestURL } from '../../requestURL';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { SignUpScreenProps } from '../types/navigation/type';
import { globalStyles } from '../styles/globalStyles';
import Toast from 'react-native-toast-message';

export const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
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
        Toast.show({
          type: 'successToast',
          text1: '사용 가능한 ID입니다.',
          position: 'bottom',
        });
      } else {
        throw new Error('중복된 아이디가 존재합니다.');
      }
    } catch (error: any) {
      Toast.show({
        type: 'errorToast',
        text1: `${error.message}`,
        position: 'bottom',
      });
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
        throw new Error('ID 또는 비밀번호를 확인해주세요.');
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
        Toast.show({
          type: 'successToast',
          text1: '회원가입 성공!',
          position: 'bottom',
        });
        console.log(response);
      }
    } catch (error: any) {
      Toast.show({
        type: 'errorToast',
        text1: `${error.message}`,
        position: 'bottom',
      });
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>회원가입</Text>
      <View style={styles.verify_id_form}>
        <TextInput
          label={'ID'}
          mode="outlined"
          placeholder="아이디를 입력하세요."
          onChangeText={(text) => setInfo({ ...info, ['id']: text })}
          onBlur={() => {
            if (info.id.length > 0 && !validationId.test(info.id)) {
              Toast.show({
                type: 'errorToast',
                text1: '아이디 형식을 확인해주세요.',
                position: 'bottom',
              });
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
          contentStyle={styles.verify_id_form_button_content}
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
        style={globalStyles.input}
        activeOutlineColor="#FFD54A"
        outlineColor="#DCDCDC"
      />
      <TextInput
        label={'PASSWORD'}
        mode="outlined"
        placeholder="비밀번호를 다시 한번 입력하세요."
        secureTextEntry={true}
        onChangeText={(text) => setInfo({ ...info, ['verify_password']: text })}
        style={globalStyles.input}
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
            Toast.show({
              type: 'errorToast',
              text1: '이름 형식을 확인해주세요.',
              position: 'bottom',
            });
          }
        }}
        style={globalStyles.input}
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
            Toast.show({
              type: 'errorToast',
              text1: '휴대폰 번호 형식을 확인해주세요.',
              position: 'bottom',
            });
          }
        }}
        style={globalStyles.input}
        activeOutlineColor="#FFD54A"
        outlineColor="#DCDCDC"
      />
      <View style={globalStyles.buttonGroup}>
        <Button
          mode="contained"
          style={globalStyles.button}
          contentStyle={globalStyles.buttonContent}
          buttonColor="#FFD54A"
          onPress={signUpRequest}
        >
          가입하기
        </Button>
        <Button
          mode="outlined"
          style={globalStyles.outlineButton}
          contentStyle={globalStyles.outlineButtonContent}
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
  form: {
    width: '100%',
    paddingTop: 30,
  },
  verify_id_form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  verify_id_form_input: {
    width: '70%',
    height: 42,
    backgroundColor: 'white',
    paddingBottom: 12,
  },
  verify_id_form_button: {
    width: '28%',
    height: 56,
    marginLeft: 6,
    borderRadius: 28,
  },
  verify_id_form_button_content: {
    height: '100%',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
});
