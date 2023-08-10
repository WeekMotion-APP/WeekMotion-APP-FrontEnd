import React, { Dispatch, SetStateAction } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { DiaryScreenProps } from '../../types/navigation/type';

export const MainHeader = ({
  navigation,
  visible,
  setVisible,
}: {
  navigation: DiaryScreenProps['navigation'];
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
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
        <Image
          style={styles.textLogo}
          source={require('../../assets/images/weekmotion_text.png')}
        />
      </TouchableHighlight>
      <View style={styles.iconGroup}>
        <TouchableHighlight
          underlayColor={'white'}
          onPress={() => setVisible(!visible)}
        >
          <Image
            style={globalStyles.icon}
            source={require('../../assets/images/addIcon.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'white'}
          onPress={() => navigation.navigate('Menu')}
        >
          <Image
            style={globalStyles.icon}
            source={require('../../assets/images/hamburgerIcon.png')}
          />
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
  textLogo: {
    width: 160,
    height: 28,
  },
});
