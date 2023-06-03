import React, { Dispatch, SetStateAction } from 'react';
import { Image, View } from 'react-native';
import { Portal, Modal, Text, Button } from 'react-native-paper';
import { globalStyles } from '../../styles/globalStyles';

export const ToTrashModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: { toCalendar: boolean; toTrash: boolean; cancel: boolean };
  setModalVisible: Dispatch<
    SetStateAction<{ toCalendar: boolean; toTrash: boolean; cancel: boolean }>
  >;
}) => {
  return (
    <Portal>
      <Modal
        visible={modalVisible.toTrash}
        style={globalStyles.modal}
        contentContainerStyle={globalStyles.modalContent}
      >
        <View style={globalStyles.modalHeader}>
          <Text style={globalStyles.heading}>
            감정을 소각장으로{'\n'}
            보낼까요?
          </Text>
          <Button
            mode="text"
            onPress={() =>
              setModalVisible({ ...modalVisible, ['toTrash']: false })
            }
          >
            <Image source={require('../../assets/images/xIcon.png')} />
          </Button>
        </View>
        <View style={globalStyles.modalImageContainer}>
          <Image
            source={require('../../assets/images/toTrashWeekmotion.png')}
          />
        </View>
        <View style={globalStyles.modalButtonGroup}>
          <Button
            mode="outlined"
            style={{ borderColor: '#FFD54A', borderWidth: 2 }}
            textColor="#FFD54A"
            onPress={() =>
              setModalVisible({ ...modalVisible, ['toTrash']: false })
            }
          >
            취소
          </Button>
          <Button buttonColor="#FFD54A" mode="contained">
            보내기
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
