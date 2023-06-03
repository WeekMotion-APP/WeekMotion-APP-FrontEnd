import { SelectEmotionRouteProps } from '../types/navigation/type';

export const headingCondition = (route: SelectEmotionRouteProps) => {
  if (route.params.status === 'before' && route.params.date === 'today') {
    return '오늘의 감정을 선택하세요.';
  }
  if (route.params.status === 'before' && route.params.date === 'selectedDay') {
    return '선택한 날의 감정을 선택하세요.';
  }
  if (route.params.status === 'after' && route.params.date === 'today') {
    return '일기를 쓰고 난 후, 오늘의 감정이 바뀌었나요?';
  }
  if (route.params.status === 'after' && route.params.date === 'selectedDay') {
    return '일기를 쓰고 난 후, 이 날의 감정이 바뀌었나요?';
  }
};
