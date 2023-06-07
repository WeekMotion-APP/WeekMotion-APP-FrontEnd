import { RouteProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Diary: { view: 'calendar' | 'list'; location: 'calendar' | 'trash' };
  SelectEmotion: { status: 'before' | 'after' };
  Edit: { status: 'create' | 'update' };
  Post: {
    location: 'created' | 'calendar' | 'trash';
    postId: string | undefined;
  };
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
