import {ButtonTheme, ButtonThemesObject} from './types';

export const defaultThemes: ButtonThemesObject = {
  default: {
    loadingColor: '#ffffff',
    loadingSize: 'small',
  },
  outlined: {
    style: {
      borderColor: '#4666ff',
      backgroundColor: 'transparent',
    },
    textStyle: {
      color: '#4666ff',
    },
    loadingColor: '#4666ff',
    loadingSize: 'small',
  },
};
