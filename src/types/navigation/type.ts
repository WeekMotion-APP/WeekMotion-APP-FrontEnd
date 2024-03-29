import { RouteProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Terms: undefined;
  Info: undefined;
  Diary: { view: 'calendar' | 'list'; location: 'calendar' | 'trash' };
  SelectEmotion: {
    status: 'before' | 'after' | 'update';
    date: 'today' | 'selectedDay';
  };
  Edit: { status: 'create' | 'update'; date: 'today' | 'selectedDay' };
  Post: {
    location: 'created' | 'calendar' | 'trash';
    postId: string | undefined;
  };
  Menu: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type SignInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignIn'
>;
export type SignUpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUp'
>;
export type TermsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Terms'
>;
export type InfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Info'
>;
export type DiaryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Diary'
>;
export type DiaryRouteProps = RouteProp<RootStackParamList, 'Diary'>;
export type SelectEmotionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SelectEmotion'
>;
export type SelectEmotionRouteProps = RouteProp<
  RootStackParamList,
  'SelectEmotion'
>;
export type EditScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Edit'
>;
export type EditRouteProps = RouteProp<RootStackParamList, 'Edit'>;
export type PostScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Post'
>;
export type PostRouteProps = RouteProp<RootStackParamList, 'Post'>;
export type MenuScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Menu'
>;
export type MenuRouteProps = RouteProp<RootStackParamList, 'Menu'>;

export type AnyNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  | 'Diary'
  | 'Edit'
  | 'Home'
  | 'Menu'
  | 'Post'
  | 'SelectEmotion'
  | 'SignIn'
  | 'SignUp'
  | 'Terms'
  | 'Info'
>['navigation'];
