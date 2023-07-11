import React, { Dispatch, SetStateAction } from 'react';
import { Image, TouchableHighlight, View, Text } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import { requestCreateDiary } from '../../functions/asyncFunctions/requestDiary';
import { useAppSelector } from '../../redux';
import { globalStyles } from '../../styles/globalStyles';
import { PostScreenProps } from '../../types/navigation/type';
import { ModalButton } from '../buttons/ModalButton';

export const ToTrashModal = ({
  modalVisible,
  setModalVisible,
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
  navigation: PostScreenProps['navigation'];
}) => {
  const note = useAppSelector((state) => {
    return state.note;
  });
  const emotion = useAppSelector((state) => {
    return state.emotion.checkedEmotion;
  });
  return (
    <Portal>
      <Modal
        visible={modalVisible.toTrash}
        onDismiss={() =>
          setModalVisible({ ...modalVisible, ['toTrash']: false })
        }
        style={globalStyles.modal}
        contentContainerStyle={globalStyles.modalContent}
      >
        <View style={globalStyles.modalHeader}>
          <Text style={globalStyles.heading}>
            감정을 소각장으로{'\n'}
            보낼까요?
          </Text>
          <TouchableHighlight
            underlayColor={'white'}
            onPress={() =>
              setModalVisible({ ...modalVisible, ['toTrash']: false })
            }
          >
            <Image
              style={globalStyles.icon}
              source={require('../../assets/images/xIcon.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={globalStyles.modalImageContainer}>
          <Image
            style={globalStyles.modalImg}
            source={require('../../assets/images/toTrashWeekmotion.png')}
          />
        </View>
        <View style={globalStyles.modalButtonGroup}>
          <ModalButton
            mode="outline"
            text="취소"
            onPress={() =>
              setModalVisible({ ...modalVisible, ['toTrash']: false })
            }
          />
          <ModalButton
            mode="contain"
            text="보내기"
            onPress={() =>
              requestCreateDiary({
                diary: note,
                emotion: emotion,
                category: 'trash',
                duplicated: false,
                navigation: navigation,
              })
            }
          />
        </View>
      </Modal>
    </Portal>
  );
};
