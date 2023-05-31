import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const HomeScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignIn');
    }, 1500);
  });

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/weekmotion.png')} />
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
});
