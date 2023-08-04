import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { TermsScreenProps } from '../types/navigation/type';
import { useAppDispatch } from '../redux';
import { updateInfo } from '../redux/slice/infoSlice';

export const TermsScreen = ({
  navigation,
}: {
  navigation: TermsScreenProps['navigation'];
}) => {
  const [terms, setTerms] = useState({
    personal: false,
    service: false,
    marketing: false,
  });
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>회원가입</Text>
      <Text style={styles.description}>
        {'서비스 이용을 위해\n정책 및 약관을 확인해 주세요.'}
      </Text>
      <View>
        <View style={styles.info}>
          <Pressable
            onPress={() => {
              Object.values(terms).includes(false)
                ? setTerms({ personal: true, service: true, marketing: true })
                : setTerms({
                    personal: false,
                    service: false,
                    marketing: false,
                  });
            }}
          >
            <Image
              style={styles.checkbox}
              source={
                Object.values(terms).includes(false)
                  ? require('../assets/images/unCheckedBox.png')
                  : require('../assets/images/checkedBox.png')
              }
            />
          </Pressable>
          <Text>필수 항목 전체동의</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoView}>
            <View style={styles.info}>
              <Pressable
                onPress={() =>
                  setTerms({ ...terms, ['personal']: !terms.personal })
                }
              >
                <Image
                  style={styles.checkbox}
                  source={
                    terms.personal
                      ? require('../assets/images/checkedBox.png')
                      : require('../assets/images/unCheckedBox.png')
                  }
                />
              </Pressable>
              <Text>(필수) 개인정보 수집 및 이용 동의</Text>
            </View>
            <Pressable
              style={styles.info}
              onPress={() => {
                dispatch(updateInfo('personal'));
                navigation.navigate('Info');
              }}
            >
              <Text>보기</Text>
              <Image
                style={styles.arrow}
                source={require('../assets/images/circleArrowRight.png')}
              />
            </Pressable>
          </View>
          <View style={styles.infoView}>
            <View style={styles.info}>
              <Pressable
                onPress={() =>
                  setTerms({ ...terms, ['service']: !terms.service })
                }
              >
                <Image
                  style={styles.checkbox}
                  source={
                    terms.service
                      ? require('../assets/images/checkedBox.png')
                      : require('../assets/images/unCheckedBox.png')
                  }
                />
              </Pressable>
              <Text>(필수) 서비스 이용약관 동의</Text>
            </View>
            <Pressable
              style={styles.info}
              onPress={() => {
                dispatch(updateInfo('service'));
                navigation.navigate('Info');
              }}
            >
              <Text>보기</Text>
              <Image
                style={styles.arrow}
                source={require('../assets/images/circleArrowRight.png')}
              />
            </Pressable>
          </View>
          <View style={styles.infoView}>
            <View style={styles.info}>
              <Pressable
                onPress={() =>
                  setTerms({ ...terms, ['marketing']: !terms.marketing })
                }
              >
                <Image
                  style={styles.checkbox}
                  source={
                    terms.marketing
                      ? require('../assets/images/checkedBox.png')
                      : require('../assets/images/unCheckedBox.png')
                  }
                />
              </Pressable>
              <Text>(선택) 마케팅 수신 동의</Text>
            </View>
            <Pressable
              style={styles.info}
              onPress={() => {
                dispatch(updateInfo('marketing'));
                navigation.navigate('Info');
              }}
            >
              <Text>보기</Text>
              <Image
                style={styles.arrow}
                source={require('../assets/images/circleArrowRight.png')}
              />
            </Pressable>
          </View>
        </View>
        <Text>선택항목은 동의하지 않으셔도 서비스를 이용할 수 있어요.</Text>
      </View>
      <Pressable
        style={
          terms.personal === false || terms.service === false
            ? globalStyles.disabledButton
            : globalStyles.button
        }
        onPress={() => {
          if (terms.personal === false || terms.service === false) {
            return;
          } else {
            navigation.navigate('SignUp');
          }
        }}
      >
        <Text style={globalStyles.buttonContent}>다음</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
  },
  description: {
    fontSize: 20,
    fontWeight: '400',
  },
  checkbox: {
    width: 24,
    height: 24,
  },
  arrow: {
    width: 16,
    height: 16,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ACACAC',
    marginVertical: 8,
  },
  infoView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
