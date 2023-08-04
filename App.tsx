import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { SignInScreen } from './src/screens/SignInScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { EditScreen } from './src/screens/EditScreen';
import { PostScreen } from './src/screens/PostScreen';
import { MenuScreen } from './src/screens/MenuScreen';
import { DiaryScreen } from './src/screens/DiaryScreen';
import { TermsScreen } from './src/screens/TermsScreen';

import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { RootStackParamList } from './src/types/navigation/type';
import { SelectEmotionScreen } from './src/screens/SelectEmotionScreen';
import store from './src/redux';
import { toastConfig } from './src/styles/toastConfig';
import SplashScreen from 'react-native-splash-screen';
import { requestUserInfo } from './src/functions/asyncFunctions/requestUserInfo';
import { InfoScreen } from './src/screens/InfoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>();
  useEffect(() => {
    const entryNavigation = async () => {
      try {
        const response = await requestUserInfo();
        if (response?.data?.data) {
          setInitialRoute('Diary');
        } else {
          setInitialRoute('SignIn');
        }
      } catch (error) {
        setInitialRoute('SignIn');
      }
    };
    entryNavigation();
    SplashScreen.hide();
  }, []);
  if (!initialRoute) {
    return <></>;
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={initialRoute ? initialRoute : 'SignIn'}
            >
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
                name="Terms"
                component={TermsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Info"
                component={InfoScreen}
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
                initialParams={{ location: 'calendar', view: 'calendar' }}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Menu"
                component={MenuScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
            <Toast config={toastConfig} />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
