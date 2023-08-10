import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { BackTitleHeader } from '../components/headers/BackTitleHeader';
import { useAppSelector } from '../redux';
import { infoString } from '../redux/slice/infoSlice';
import { termsOfUse } from '../terms/termsOfUse';
import { AnyNavigationProps } from '../types/navigation/type';

export const InfoScreen = ({
  navigation,
}: {
  navigation: AnyNavigationProps;
}) => {
  const info = useAppSelector((state) => {
    return state.info.value;
  });
  const titleFilter = (key: infoString) => {
    switch (key) {
      case 'personal':
        return '개인정보 수집 및 이용 동의';
      case 'service':
        return '서비스 이용약관';
      case 'marketing':
        return '마케팅 수신동의';
      default:
        return '';
    }
  };
  const desc = (key: infoString) => {
    switch (key) {
      case 'personal':
        return <ScrollView style={styles.container}></ScrollView>;
      case 'service':
        return (
          <ScrollView style={styles.container}>
            {termsOfUse.map((value, index) => (
              <View style={styles.descView} key={index}>
                <Text style={styles.title}>{value.title}</Text>
                {value.description.map((description, index) => (
                  <Text style={styles.desc} key={index}>
                    {description}
                  </Text>
                ))}
              </View>
            ))}
          </ScrollView>
        );
      case 'marketing':
        return <ScrollView style={styles.container}></ScrollView>;
      default:
        break;
    }
  };
  return (
    <SafeAreaView>
      <BackTitleHeader navigation={navigation} title={titleFilter(info)} />
      {desc(info)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  descView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
  desc: {
    fontWeight: '400',
    fontSize: 14,
  },
});
