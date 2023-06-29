import React, { Dispatch, SetStateAction } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import {
  EditScreenProps,
  PostScreenProps,
  SelectEmotionScreenProps,
} from '../../types/navigation/type';

export const BackCancelHeader = ({
  modalVisible,
  setModalVisible,
  route,
  navigation,
}: {
  modalVisible:
    | {
        toCalendar: boolean;
        toTrash: boolean;
        cancel: boolean;
        delete: boolean;
      }
    | undefined;
  setModalVisible:
    | Dispatch<
        SetStateAction<{
          toCalendar: boolean;
          toTrash: boolean;
          cancel: boolean;
          delete: boolean;
        }>
      >
    | undefined;
  route:
    | SelectEmotionScreenProps['route']
    | EditScreenProps['route']
    | PostScreenProps['route'];
  navigation:
    | SelectEmotionScreenProps['navigation']
    | EditScreenProps['navigation']
    | PostScreenProps['navigation'];
}) => {
  return (
    <View style={globalStyles.headerContainer}>
      <TouchableHighlight
        underlayColor={'white'}
        onPress={() => {
          if (
            route.name === 'SelectEmotion' &&
            route.params.status === 'after'
          ) {
            navigation.navigate('Edit', {
              status: 'create',
              date: 'selectedDay',
            });
            return;
          } else if (
            route.name === 'Edit' &&
            route.params.status === 'create'
          ) {
            navigation.navigate('SelectEmotion', {
              status: 'before',
              date: 'selectedDay',
            });
            return;
          }
          navigation.goBack();
        }}
      >
        <Image source={require('../../assets/images/backIcon.png')} />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={'white'}
        onPress={() => {
          if (
            modalVisible &&
            setModalVisible &&
            route.name === 'Post' &&
            route.params.location === 'created'
          ) {
            setModalVisible({ ...modalVisible, ['cancel']: true });
            return;
          }
          navigation.navigate('Diary', {
            view: 'calendar',
            location: 'calendar',
          });
        }}
      >
        <Image source={require('../../assets/images/xIcon.png')} />
      </TouchableHighlight>
    </View>
  );
};
