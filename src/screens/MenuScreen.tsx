// import axios from 'axios';
import React from 'react';
import {
  SafeAreaView,
  Pressable,
  View,
  Image,
  Text,
  StyleSheet,
  // Button,
} from 'react-native';
import { useAppDispatch } from '../redux';
import { updateInfo } from '../redux/slice/infoSlice';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import { requestURL } from '../../requestURL';
// import { Input } from '../components/input/Input';
import { globalStyles } from '../styles/globalStyles';
import { MenuScreenProps } from '../types/navigation/type';

export const MenuScreen = ({ navigation }: MenuScreenProps) => {
  const dispatch = useAppDispatch();
  // const [pw, setPw] = useState({
  //   password: '',
  //   newPassword: '',
  // });
  const menu = [
    {
      value: '소각장',
      source: require('../assets/images/menuIcon1.png'),
      eventHandler: () =>
        navigation.navigate('Diary', { view: 'list', location: 'trash' }),
    },
    { value: '공지사항', source: require('../assets/images/menuIcon2.png') },
    {
      value: '개인 정보 수집 및 이용약관',
      source: require('../assets/images/menuIcon3.png'),
      eventHandler: () => {
        dispatch(updateInfo('personal'));
        navigation.navigate('Info');
      },
    },
    {
      value: '서비스 이용약관',
      source: require('../assets/images/menuIcon4.png'),
      eventHandler: () => {
        dispatch(updateInfo('service'));
        navigation.navigate('Info');
      },
    },
    {
      value: '마케팅 수신',
      source: require('../assets/images/menuIcon5.png'),
    },
  ];
  // const requestChangePassword = async () => {
  //   const accessToken = await EncryptedStorage.getItem('accessToken');
  //   try {
  //     const response = await axios.patch(
  //       '/user/password',
  //       {
  //         password: pw.password,
  //         newPassword: pw.newPassword,
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //         baseURL: requestURL,
  //       }
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <SafeAreaView style={globalStyles.container}>
      {menu.map((value, index) => (
        <Pressable
          style={styles.menuView}
          key={index}
          onPress={value.eventHandler}
        >
          <View style={styles.iconTextView}>
            <Image style={globalStyles.icon} source={value.source} />
            <Text style={styles.text}>{value.value}</Text>
          </View>
          <Image
            style={globalStyles.icon}
            source={require('../assets/images/forwardIcon.png')}
          />
        </Pressable>
      ))}
      <View style={styles.textMenuView}>
        <Text style={styles.textLink}>로그아웃</Text>
      </View>
      <View style={styles.textMenuView}>
        <Text style={styles.textLink}>회원 탈퇴</Text>
      </View>
      <View style={styles.textMenuView}>
        <Text style={styles.textLink}>아이디 찾기</Text>
      </View>
      <View style={styles.textMenuView}>
        <Text style={styles.textLink}>비밀번호 재설정</Text>
      </View>
      {/* <View>
        <Input
          label="현재 비밀번호"
          text={pw.password}
          placeholder="현재 비밀번호"
          secure={true}
          onChangeText={(text) => setPw({ ...pw, ['password']: text })}
        />
        <Input
          label="새로운 비밀번호"
          text={pw.password}
          placeholder="새로운 비밀번호"
          secure={true}
          onChangeText={(text) => setPw({ ...pw, ['newPassword']: text })}
        />
        <Button title="바꾸기" onPress={requestChangePassword}>
          {'바꾸기'}
        </Button>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  iconTextView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
  },
  textMenuView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  textLink: {
    color: '#FF64AE',
    fontSize: 16,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});
