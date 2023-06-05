import { globalStyles } from '../styles/globalStyles';

export const chipColorPicker = (seq: string) => {
  if (seq === '1') {
    return globalStyles.chipPink;
  } else if (seq === '2') {
    return globalStyles.chipBlue;
  } else {
    return globalStyles.chipYellow;
  }
};
