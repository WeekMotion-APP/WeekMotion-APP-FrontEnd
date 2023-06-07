import React from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { DiaryScreenProps } from '../../types/navigation/type';

export const MainHeader = ({
  route,
  navigation,
}: {
  route: DiaryScreenProps['route'];
  navigation: DiaryScreenProps['navigation'];
}) => {
  return (
    <View style={globalStyles.headerContainer}>
      <TouchableHighlight
        underlayColor={'white'}
        onPress={() =>
          navigation.navigate('Diary', {
            view: 'calendar',
            location: 'calendar',
          })
        }
      >
        <Image source={require('../../assets/images/weekmotion_text.png')} />
      </TouchableHighlight>
      <View style={styles.iconGroup}>
        {route.params.location === 'calendar' && (
          <TouchableHighlight
            underlayColor={'white'}
            onPress={() =>
              navigation.navigate('Diary', {
                view: 'list',
                location: 'trash',
              })
            }
          >
            <Image source={require('../../assets/images/fireIcon.png')} />
          </TouchableHighlight>
        )}
        <TouchableHighlight
          underlayColor={'white'}
          onPress={() =>
            navigation.navigate('SelectEmotion', { status: 'before' })
          }
        >
          <Image source={require('../../assets/images/addIcon.png')} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 22,
  },
});
