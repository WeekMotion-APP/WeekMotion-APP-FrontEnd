import React, { useState } from 'react';
import axios from 'axios';
import { requestURL } from '../../requestURL';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { SignUpScreenProps } from '../types/navigation/type';
import { globalStyles } from '../styles/globalStyles';
import Toast from 'react-native-toast-message';
import { Input } from '../components/input/Input';

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
        navigation.navigate('SignIn');
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
        <Input
          label={'ID'}
          text={info.id}
          placeholder="아이디를 입력하세요."
          onChangeText={(text) => setInfo({ ...info, ['id']: text })}
          secure={false}
        />
        <Pressable
          style={styles.verify_id_form_button}
          onPress={() => verifyIdRequest(info.id)}
        >
          <Text style={styles.verify_id_form_button_content}>확인</Text>
        </Pressable>
      </View>
      <Input
        label={'PASSWORD'}
        text={info.password}
        placeholder="비밀번호를 입력하세요."
        secure={true}
        onChangeText={(text) => setInfo({ ...info, ['password']: text })}
      />
      <Input
        label={'PASSWORD'}
        text={info.verify_password}
        placeholder="비밀번호를 다시 한번 입력하세요."
        secure={true}
        onChangeText={(text) => setInfo({ ...info, ['verify_password']: text })}
      />
      <Input
        label={'이름'}
        text={info.name}
        placeholder="이름을 입력하세요."
        onChangeText={(text) => setInfo({ ...info, ['name']: text })}
        secure={false}
      />
      <Input
        label={'휴대폰 번호'}
        text={info.phone}
        placeholder="휴대폰 번호를 '-'을 제외한 숫자만 입력해주세요."
        onChangeText={(text) => setInfo({ ...info, ['phone']: text })}
        secure={false}
      />
      <View style={globalStyles.buttonGroup}>
        <Pressable style={globalStyles.button} onPress={signUpRequest}>
          <Text style={globalStyles.buttonContent}>가입하기</Text>
        </Pressable>
        <Pressable
          style={globalStyles.outlineButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={globalStyles.outlineButtonContent}>돌아가기</Text>
        </Pressable>
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
    width: '75%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verify_id_form_button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: '#FFD54A',
  },
  verify_id_form_button_content: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 1,
    color: 'white',
  },
});
