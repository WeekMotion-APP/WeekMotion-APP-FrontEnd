import React, { Dispatch, SetStateAction } from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import { Portal, Modal, Text, Button } from 'react-native-paper';
import {
  requestDeleteDiary,
  requestReadDiary,
} from '../../functions/asyncFunctions/requestDiary';
import { useThunkDispatch } from '../../redux';
import { globalStyles } from '../../styles/globalStyles';
import { PostScreenProps } from '../../types/navigation/type';

export const _DeleteModal = ({
  modalVisible,
  setModalVisible,
  route,
  navigation,
}: {
  modalVisible: {
    toCalendar: boolean;
    toTrash: boolean;
    cancel: boolean;
    delete: boolean;
  };
  setModalVisible: Dispatch<
    SetStateAction<{
      toCalendar: boolean;
      toTrash: boolean;
      cancel: boolean;
      delete: boolean;
    }>
  >;
  route: PostScreenProps['route'];
  navigation: PostScreenProps['navigation'];
}) => {
  const thunkDispatch = useThunkDispatch();

  const handleDelete = async () => {
    await requestDeleteDiary(route.params.postId);
    await thunkDispatch(requestReadDiary('trash'));
    navigation.goBack();
  };

  return (
    <Portal>
      <Modal
        visible={modalVisible.delete}
        onDismiss={() =>
          setModalVisible({ ...modalVisible, ['delete']: false })
        }
        style={globalStyles.modal}
        contentContainerStyle={globalStyles.modalContent}
      >
        <View style={globalStyles.modalHeader}>
          <Text style={globalStyles.heading}>
            감정을 소각할까요?{'\n'}
            완전 소각한 감정은 다시는
            {'\n'}볼 수 없어요.
          </Text>
          <TouchableHighlight
            underlayColor={'white'}
            onPress={() =>
              setModalVisible({ ...modalVisible, ['delete']: false })
            }
          >
            <Image source={require('../../assets/images/xIcon.png')} />
          </TouchableHighlight>
        </View>
        <View style={globalStyles.modalButtonGroup}>
          <Button
            mode="outlined"
            style={{ borderColor: '#FFD54A', borderWidth: 2 }}
            textColor="#FFD54A"
            onPress={() =>
              setModalVisible({ ...modalVisible, ['delete']: false })
            }
          >
            취소
          </Button>
          <Button buttonColor="#FFD54A" mode="contained" onPress={handleDelete}>
            소각하기
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
