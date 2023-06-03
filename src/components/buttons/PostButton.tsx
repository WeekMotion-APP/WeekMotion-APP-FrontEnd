import React, { Dispatch, SetStateAction } from 'react';
import { Button } from 'react-native-paper';
import { PostScreenProps } from '../../types/navigation/type';
import { globalStyles } from '../../styles/globalStyles';
import { View } from 'react-native';

export const PostButton = ({
  route,
  navigation,
  modalVisible,
  setModalVisible,
}: {
  route: PostScreenProps['route'];
  navigation: PostScreenProps['navigation'];
  modalVisible: { toCalendar: boolean; toTrash: boolean; cancel: boolean };
  setModalVisible: Dispatch<
    SetStateAction<{ toCalendar: boolean; toTrash: boolean; cancel: boolean }>
  >;
}) => {
  const filterPostButton = () => {
    if (route.params.location === 'created') {
      return (
        <View style={globalStyles.buttonGroup}>
          <Button
            mode="contained"
            style={globalStyles.button}
            contentStyle={globalStyles.buttonContent}
            buttonColor="#FFD54A"
            onPress={() =>
              setModalVisible({ ...modalVisible, ['toCalendar']: true })
            }
          >
            감정을 캘린더에 등록하기
          </Button>
          <Button
            mode="outlined"
            style={globalStyles.outlineButton}
            contentStyle={globalStyles.outlineButtonContent}
            textColor="#FFD54A"
            onPress={() =>
              setModalVisible({ ...modalVisible, ['toTrash']: true })
            }
          >
            감정을 소각장으로 보내기
          </Button>
        </View>
      );
    } else if (route.params.location === 'calendar') {
      return (
        <Button
          mode="outlined"
          style={globalStyles.outlineButton}
          contentStyle={globalStyles.outlineButtonContent}
          textColor="#FFD54A"
          onPress={() =>
            setModalVisible({ ...modalVisible, ['toTrash']: true })
          }
        >
          감정을 소각장으로 보내기
        </Button>
      );
    } else {
      return (
        <View style={globalStyles.buttonGroup}>
          <Button
            mode="contained"
            style={globalStyles.button}
            contentStyle={globalStyles.buttonContent}
            buttonColor="#FFD54A"
            onPress={() =>
              setModalVisible({ ...modalVisible, ['toCalendar']: true })
            }
          >
            감정을 캘린더로 보내기
          </Button>
          <Button
            mode="outlined"
            style={globalStyles.outlineButton}
            contentStyle={globalStyles.outlineButtonContent}
            textColor="#FFD54A"
          >
            감정을 완전 소각하기
          </Button>
        </View>
      );
    }
  };
  return filterPostButton();
};
