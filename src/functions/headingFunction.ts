import { SelectEmotionRouteProps } from '../types/navigation/type';

export const headingCondition = (
  route: SelectEmotionRouteProps,
  date: string
) => {
  if (
    route.params.status === 'before' &&
    new Date(date).toLocaleDateString() === new Date().toLocaleDateString()
  ) {
    return '오늘의 감정을 선택하세요.';
  }
  if (
    route.params.status === 'before' &&
    new Date(date).toLocaleDateString() !== new Date().toLocaleDateString()
  ) {
    return '선택한 날의 감정을 선택하세요.';
  }
  if (
    route.params.status === 'after' &&
    new Date(date).toLocaleDateString() === new Date().toLocaleDateString()
  ) {
    return '일기를 쓰고 난 후,\n오늘의 감정이 바뀌었나요?';
  }
  if (
    route.params.status === 'after' &&
    new Date(date).toLocaleDateString() !== new Date().toLocaleDateString()
  ) {
    return '일기를 쓰고 난 후,\n이 날의 감정이 바뀌었나요?';
  }
  if (route.params.status === 'update') {
    return '수정할 감정을 선택하세요.';
  }
};
