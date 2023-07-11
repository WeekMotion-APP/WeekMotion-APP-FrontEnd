import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Portal } from 'react-native-paper';
import { Image, TouchableHighlight, View, Text } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useAppDispatch } from '../../redux';
import { PostScreenProps } from '../../types/navigation/type';
import { reset } from '../../redux/slice/noteSlice';
import { ModalButton } from '../buttons/ModalButton';

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
        onDismiss={() =>
          setModalVisible({ ...modalVisible, ['cancel']: false })
        }
        style={globalStyles.modal}
        contentContainerStyle={globalStyles.modalContent}
      >
        <View style={globalStyles.modalHeader}>
          <Text style={globalStyles.heading}>
            감정을 저장하지않고{'\n'}
            그만둘까요?
          </Text>
          <TouchableHighlight
            underlayColor={'white'}
            onPress={() => {
              setModalVisible({ ...modalVisible, ['cancel']: false });
            }}
          >
            <Image
              style={globalStyles.icon}
              source={require('../../assets/images/xIcon.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={globalStyles.modalButtonGroup}>
          <ModalButton
            mode="outline"
            text="계속 작성"
            onPress={() => {
              setModalVisible({ ...modalVisible, ['cancel']: false });
            }}
          />
          <ModalButton
            mode="contain"
            text="그만두기"
            onPress={() => {
              dispatch(reset());
              navigation.navigate('Diary', {
                view: 'calendar',
                location: 'calendar',
              });
            }}
          />
        </View>
      </Modal>
    </Portal>
  );
};
