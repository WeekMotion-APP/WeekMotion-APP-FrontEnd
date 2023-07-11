import React, { Dispatch, SetStateAction } from 'react';
import { Image, TouchableHighlight, View, Text } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import {
  requestDeleteDiary,
  requestReadDiary,
} from '../../functions/asyncFunctions/requestDiary';
import { useThunkDispatch } from '../../redux';
import { globalStyles } from '../../styles/globalStyles';
import { PostScreenProps } from '../../types/navigation/type';
import { ModalButton } from '../buttons/ModalButton';

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
          <ModalButton
            mode="outline"
            text="취소"
            onPress={() =>
              setModalVisible({ ...modalVisible, ['delete']: false })
            }
          />
          <ModalButton mode="contain" text="소각하기" onPress={handleDelete} />
        </View>
      </Modal>
    </Portal>
  );
};
