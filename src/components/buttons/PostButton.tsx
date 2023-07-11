import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PostScreenProps } from '../../types/navigation/type';
import { globalStyles } from '../../styles/globalStyles';
import { View, Pressable, Text } from 'react-native';
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

  const handleFromTrashToCalendar = async () => {
    await requestUpdateDiaryCategory(updateTarget);
    await thunkDispatch(requestReadDiary('trash'));
    navigation.goBack();
  };

  useEffect(() => {
    const renderToCalendarButtonYn = async () => {
      const renderYn = await requestCheckDiaryInCalendar(updateTarget!);
      setIsDateInCalendar(renderYn!);
    };
    if (route.params.location !== 'created') {
      renderToCalendarButtonYn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterPostButton = () => {
    if (route.params.location === 'created') {
      return (
        <View style={globalStyles.buttonGroup}>
          <Pressable
            style={globalStyles.button}
            onPress={() =>
              setModalVisible({ ...modalVisible, ['toCalendar']: true })
            }
          >
            <Text style={globalStyles.buttonContent}>
              감정을 캘린더에 등록하기
            </Text>
          </Pressable>
          <Pressable
            style={globalStyles.outlineButton}
            onPress={() =>
              setModalVisible({ ...modalVisible, ['toTrash']: true })
            }
          >
            <Text style={globalStyles.outlineButtonContent}>
              감정을 소각장으로 보내기
            </Text>
          </Pressable>
        </View>
      );
    } else if (route.params.location === 'calendar') {
      return (
        <View style={globalStyles.buttonGroup}>
          <Pressable
            style={globalStyles.outlineButton}
            onPress={handleFromCalendarToTrash}
          >
            <Text style={globalStyles.outlineButtonContent}>
              감정을 소각장으로 보내기
            </Text>
          </Pressable>
        </View>
      );
    } else {
      return (
        <View style={globalStyles.buttonGroup}>
          {isDateInCalendar ? (
            <>
              <Pressable
                style={globalStyles.button}
                onPress={handleFromTrashToCalendar}
              >
                <Text style={globalStyles.buttonContent}>
                  감정을 캘린더로 보내기
                </Text>
              </Pressable>
              <Pressable
                style={globalStyles.outlineButton}
                onPress={() =>
                  setModalVisible({ ...modalVisible, ['delete']: true })
                }
              >
                <Text style={globalStyles.outlineButtonContent}>
                  감정을 완전 소각하기
                </Text>
              </Pressable>
            </>
          ) : (
            <Pressable
              style={globalStyles.outlineButton}
              onPress={() =>
                setModalVisible({ ...modalVisible, ['delete']: true })
              }
            >
              <Text style={globalStyles.outlineButtonContent}>
                감정을 완전 소각하기
              </Text>
            </Pressable>
          )}
        </View>
      );
    }
  };
  return filterPostButton();
};
