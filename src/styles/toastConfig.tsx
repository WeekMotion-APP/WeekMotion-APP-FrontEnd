import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text,
} from 'react-native';
import Toast from 'react-native-toast-message';

export const toastConfig = {
  successToast: (props: any) => {
    return (
      <View style={styles.successToastContainer}>
        <Image
          style={styles.toastIcon}
          source={require('../assets/images/toastSuccess.png')}
        />
        <View style={styles.toastTextView}>
          <Text style={styles.toastText}>{props.text1}</Text>
        </View>
        <TouchableHighlight
          underlayColor={'#9FECB1'}
          onPress={() => Toast.hide()}
        >
          <Image
            style={styles.toastIcon}
            source={require('../assets/images/toastHide.png')}
          />
        </TouchableHighlight>
      </View>
    );
  },
  errorToast: (props: any) => {
    return (
      <View style={styles.errorToastContainer}>
        <Image
          style={styles.toastIcon}
          source={require('../assets/images/toastError.png')}
        />
        <View style={styles.toastTextView}>
          <Text style={styles.toastText}>{props.text1}</Text>
        </View>
        <TouchableHighlight
          underlayColor={'#FFBFC3'}
          onPress={() => Toast.hide()}
        >
          <Image
            style={styles.toastIcon}
            source={require('../assets/images/toastHide.png')}
          />
        </TouchableHighlight>
      </View>
    );
  },
  warningToast: (props: any) => {
    return (
      <View style={styles.errorToastContainer}>
        <Image
          style={styles.toastIcon}
          source={require('../assets/images/toastError.png')}
        />
        <View style={styles.toastTextView}>
          <Text style={styles.toastText}>{props.text1}</Text>
        </View>
        <TouchableHighlight
          underlayColor={'#FFEB82'}
          onPress={() => Toast.hide()}
        >
          <Image
            style={styles.toastIcon}
            source={require('../assets/images/toastHide.png')}
          />
        </TouchableHighlight>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  successToastContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: 40,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#9FECB1',
  },
  errorToastContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: 40,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFBFC3',
  },
  toastTextView: {
    width: '80%',
  },
  toastText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  toastIcon: {
    width: 24,
    height: 24,
  },
});
