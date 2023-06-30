import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { requestUserInfo } from '../functions/asyncFunctions/requestUserInfo';
import { HomeScreenProps } from '../types/navigation/type';

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  useEffect(() => {
    const entryNavigation = async () => {
      try {
        const response = await requestUserInfo();
        if (response?.data?.data) {
          navigation.navigate('Diary', {
            view: 'calendar',
            location: 'calendar',
          });
        }
      } catch (error) {
        navigation.navigate('SignIn');
      }
    };
    entryNavigation();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/weekmotion.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  image: {
    width: 160,
    height: 160,
  },
});
