import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import {
  EditScreenProps,
  PostScreenProps,
  SelectEmotionScreenProps,
} from '../../types/navigation/type';

export const BackCancelHeader = ({
  navigation,
}: {
  navigation:
    | SelectEmotionScreenProps['navigation']
    | EditScreenProps['navigation']
    | PostScreenProps['navigation'];
}) => {
  return (
    <View style={globalStyles.headerContainer}>
      <TouchableHighlight
        underlayColor={'white'}
        onPress={() => navigation.goBack()}
      >
        <Image source={require('../../assets/images/backIcon.png')} />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={'white'}
        onPress={() =>
          navigation.navigate('Diary', {
            view: 'calendar',
            location: 'calendar',
          })
        }
      >
        <Image source={require('../../assets/images/xIcon.png')} />
      </TouchableHighlight>
    </View>
  );
};
