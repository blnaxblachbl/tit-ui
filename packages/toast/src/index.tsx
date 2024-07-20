import React, {useEffect, useRef} from 'react';
import {Platform, UIManager} from 'react-native';

import Container from './components/Container';

import {ToastHandler, ToastProps, MessageOption} from './types';

let TIT_TOAST_REF: ToastHandler;

export * from "./types";

export const showToast = (options: MessageOption) => {
  return TIT_TOAST_REF?.showToast(options);
};

export const Toast = (props: ToastProps) => {
  const toast = useRef<ToastHandler>(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    if (toast.current) {
      TIT_TOAST_REF = toast.current;
    }
  }, []);

  return <Container ref={toast} {...props} />;
};
