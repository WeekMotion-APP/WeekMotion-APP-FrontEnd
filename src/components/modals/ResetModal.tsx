import React, { Dispatch, SetStateAction } from 'react';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useAppDispatch } from '../../redux';
import { PostScreenProps } from '../../types/navigation/type';
import { reset } from '../../redux/slice/noteSlice';

export const ResetModal = ({
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
  const dispatch = useAppDispatch();
  return (
    <Portal>
      <Modal
        visible={modalVisible.cancel}
        style={globalStyles.modal}
        contentContainerStyle={globalStyles.modalContent}
      >
        <View style={globalStyles.modalHeader}>
          <Text style={globalStyles.heading}>
            감정을 저장하지않고{'\n'}
            그만둘까요?
          </Text>
          <Button
            mode="text"
            onPress={() => {
              setModalVisible({ ...modalVisible, ['cancel']: false });
            }}
          >
            <Image source={require('../../assets/images/xIcon.png')} />
          </Button>
        </View>
        <View style={globalStyles.modalButtonGroup}>
          <Button
            mode="outlined"
            style={{ borderColor: '#FFD54A', borderWidth: 2 }}
            textColor="#FFD54A"
            onPress={() => {
              setModalVisible({ ...modalVisible, ['cancel']: false });
            }}
          >
            계속 작성
          </Button>
          <Button
            buttonColor="#FFD54A"
            mode="contained"
            onPress={() => {
              dispatch(reset());
              navigation.navigate('Diary', {
                view: 'calendar',
                location: 'calendar',
              });
            }}
          >
            그만두기
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
