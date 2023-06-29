import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { PostScreenProps } from '../../types/navigation/type';
import { globalStyles } from '../../styles/globalStyles';
import { View } from 'react-native';
import { useAppSelector, useThunkDispatch } from '../../redux';
import { diary } from '../../types/data/type';
import {
  requestCheckDiaryInCalendar,
  requestReadDiary,
  requestUpdateDiaryCategory,
} from '../../functions/asyncFunctions/requestDiary';

export const PostButton = ({
  route,
  navigation,
  modalVisible,
  setModalVisible,
}: {
  route: PostScreenProps['route'];
  navigation: PostScreenProps['navigation'];
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
}) => {
  const [isDateInCalendar, setIsDateInCalendar] = useState<boolean>(false);
  const updateTarget = useAppSelector((state) => {
    return state.diary.allDiary.find((diary: diary) => {
      return diary.seq === route.params.postId;
    });
  });
  const thunkDispatch = useThunkDispatch();

  const handleFromCalendarToTrash = async () => {
    await requestUpdateDiaryCategory(updateTarget);
    await thunkDispatch(requestReadDiary('calendar'));
    navigation.goBack();
  };

  useEffect(() => {
    const renderToCalendarButtonYn = async () => {
      const renderYn = await requestCheckDiaryInCalendar(updateTarget!);
      setIsDateInCalendar(renderYn!);
    };
    renderToCalendarButtonYn();
  }, [updateTarget]);

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
        <View style={globalStyles.buttonGroup}>
          <Button
            mode="outlined"
            style={globalStyles.outlineButton}
            contentStyle={globalStyles.outlineButtonContent}
            textColor="#FFD54A"
            onPress={handleFromCalendarToTrash}
          >
            감정을 소각장으로 보내기
          </Button>
        </View>
      );
    } else {
      return (
        <View style={globalStyles.buttonGroup}>
          {isDateInCalendar ? (
            <>
              <Button
                mode="contained"
                style={globalStyles.button}
                contentStyle={globalStyles.buttonContent}
                buttonColor="#FFD54A"
                onPress={() => requestUpdateDiaryCategory(updateTarget)}
              >
                감정을 캘린더로 보내기
              </Button>
              <Button
                mode="outlined"
                style={globalStyles.outlineButton}
                contentStyle={globalStyles.outlineButtonContent}
                textColor="#FFD54A"
                onPress={() =>
                  setModalVisible({ ...modalVisible, ['delete']: true })
                }
              >
                감정을 완전 소각하기
              </Button>
            </>
          ) : (
            <Button
              mode="outlined"
              style={globalStyles.outlineButton}
              contentStyle={globalStyles.outlineButtonContent}
              textColor="#FFD54A"
              onPress={() =>
                setModalVisible({ ...modalVisible, ['delete']: true })
              }
            >
              감정을 완전 소각하기
            </Button>
          )}
        </View>
      );
    }
  };
  return filterPostButton();
};
