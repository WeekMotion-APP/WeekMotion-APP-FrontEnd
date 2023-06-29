import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import { Portal, Modal, Text, Button } from 'react-native-paper';
import {
  requestCreateDiary,
  requestIsNoteDuplicated,
} from '../../functions/asyncFunctions/requestDiary';
import { useAppSelector } from '../../redux';
import { globalStyles } from '../../styles/globalStyles';
import { PostScreenProps } from '../../types/navigation/type';

export const ToCalendarModal = ({
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
  const [duplicated, setDuplicated] = useState<boolean>(true);

  useEffect(() => {
    const checkDuplicated = async () => {
      const isDuplicated = await requestIsNoteDuplicated(note);
      setDuplicated(isDuplicated!);
    };
    checkDuplicated();
  }, [note]);
  return (
    <Portal>
      <Modal
        visible={modalVisible.toCalendar}
        onDismiss={() =>
          setModalVisible({ ...modalVisible, ['toCalendar']: false })
        }
        style={globalStyles.modal}
        contentContainerStyle={globalStyles.modalContent}
      >
        <View style={globalStyles.modalHeader}>
          <Text style={globalStyles.heading}>
            감정을 등록할까요?{'\n'}
            등록한 감정은 캘린더에서
            {'\n'}확인할 수 있어요!
          </Text>
          <TouchableHighlight
            underlayColor={'white'}
            onPress={() =>
              setModalVisible({ ...modalVisible, ['toCalendar']: false })
            }
          >
            <Image source={require('../../assets/images/xIcon.png')} />
          </TouchableHighlight>
        </View>
        <View style={globalStyles.modalImageContainer}>
          <Image
            source={require('../../assets/images/toCalendarWeekmotion.png')}
          />
        </View>
        <View style={globalStyles.modalButtonGroup}>
          <Button
            mode="outlined"
            style={{ borderColor: '#FFD54A', borderWidth: 2 }}
            textColor="#FFD54A"
            onPress={() =>
              setModalVisible({ ...modalVisible, ['toCalendar']: false })
            }
          >
            취소
          </Button>
          <Button
            buttonColor="#FFD54A"
            mode="contained"
            onPress={() =>
              requestCreateDiary({
                diary: note,
                emotion: emotion,
                category: 'calendar',
                duplicated: duplicated,
                navigation: navigation,
              })
            }
          >
            등록하기
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
