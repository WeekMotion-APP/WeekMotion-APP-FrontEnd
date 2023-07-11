import React from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Text,
} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { DiaryScreenProps } from '../../types/navigation/type';

export const TrashListHeader = ({
  navigation,
}: {
  navigation: DiaryScreenProps['navigation'];
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableHighlight
        underlayColor={'white'}
        onPress={() => {
          navigation.navigate('Diary', {
            view: 'calendar',
            location: 'calendar',
          });
        }}
      >
        <Image
          style={globalStyles.icon}
          source={require('../../assets/images/backIcon.png')}
        />
      </TouchableHighlight>
      <Text style={styles.heading}>소각장</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 25,
    marginLeft: 120,
  },
});
