import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { HomeScreen } from './src/screens/HomeScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { EditScreen } from './src/screens/EditScreen';
import { PostScreen } from './src/screens/PostScreen';

import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { RootStackParamList } from './src/types/navigation/type';
import { SelectEmotionScreen } from './src/screens/SelectEmotionScreen';
import store from './src/redux';
import { DiaryScreen } from './src/screens/DiaryScreen';
import { toastConfig } from './src/styles/toastConfig';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectEmotion"
              component={SelectEmotionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Edit"
              component={EditScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Post"
              component={PostScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Diary"
              component={DiaryScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
