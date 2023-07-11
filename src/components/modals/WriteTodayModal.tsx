import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Portal } from 'react-native-paper';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { DiaryScreenProps } from '../../types/navigation/type';
import { setWriteToday } from '../../functions/asyncFunctions/requestUserInfo';
import { ModalButton } from '../buttons/ModalButton';

export const WriteTodayModal = ({
  navigation,
  visible,
  setVisible,
}: {
  navigation: DiaryScreenProps['navigation'];
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        style={globalStyles.modal}
        contentContainerStyle={globalStyles.modalContent}
      >
        <View style={globalStyles.modalHeader}>
          <Text style={globalStyles.heading}>
            오늘의 감정을{'\n'}
            기록하러 갈까요?
          </Text>
          <TouchableHighlight
            underlayColor={'white'}
            onPress={() => setVisible(false)}
          >
            <Image source={require('../../assets/images/xIcon.png')} />
          </TouchableHighlight>
        </View>
        <View style={globalStyles.modalImageContainer}>
          <Image source={require('../../assets/images/isWriteToday.png')} />
        </View>
        <View style={styles.checkboxView}>
          <Text>오늘 하루 보지않기</Text>
          <TouchableHighlight
            underlayColor={'white'}
            onPress={() => {
              setIsChecked(!isChecked);
            }}
          >
            {isChecked ? (
              <Image source={require('../../assets/images/checkedBox.png')} />
            ) : (
              <Image source={require('../../assets/images/unCheckedBox.png')} />
            )}
          </TouchableHighlight>
        </View>
        <View style={globalStyles.modalButtonGroup}>
          <ModalButton
            mode="outline"
            text="안할래요"
            onPress={() => {
              setWriteToday(isChecked ? 'Y' : 'N');
              setVisible(false);
            }}
          />
          <ModalButton
            mode="contain"
            text="기록하기"
            onPress={() => {
              setWriteToday(isChecked ? 'Y' : 'N');
              navigation.navigate('SelectEmotion', {
                status: 'before',
                date: 'today',
              });
            }}
          />
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  checkboxView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    gap: 4,
  },
});
