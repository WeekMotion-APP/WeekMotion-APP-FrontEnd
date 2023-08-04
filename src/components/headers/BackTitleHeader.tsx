import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { AnyNavigationProps } from '../../types/navigation/type';

export const BackTitleHeader = ({
  navigation,
  title,
}: {
  navigation: AnyNavigationProps;
  title: string;
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableHighlight
        style={styles.arrow}
        underlayColor={'white'}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={globalStyles.icon}
          source={require('../../assets/images/backIcon.png')}
        />
      </TouchableHighlight>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 56,
    backgroundColor: 'white',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  heading: {
    alignSelf: 'center',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 25,
  },
  arrow: {
    alignSelf: 'flex-start',
    flex: 1,
  },
});
