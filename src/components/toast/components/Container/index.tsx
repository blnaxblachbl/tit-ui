import React, {forwardRef, useState, useImperativeHandle} from 'react';
import {LayoutAnimation, LayoutAnimationConfig, View} from 'react-native';

import Message from '../Message';

import {
  ToastHandler,
  ToastProps,
  ToastMessage,
  MessageOption,
  Themes,
} from '../../types';
import {styles} from './styles';

const Container = forwardRef<ToastHandler, ToastProps>(
  (
    {
      maxToShow = 3,
      duration = 3000,
      themes = {
        success: {
          style: styles.defaultSuccess,
        },
        error: {
          style: styles.defaultError,
        },
        info: {
          style: styles.defaultInfo,
        },
        warning: {
          style: styles.defaultWarn,
        },
      } as Themes,
      style,
      textStyle,
      titleStyle,
      renderToast,
    },
    ref,
  ) => {
    const config: LayoutAnimationConfig = {
      duration: 200,
      create: undefined,
      delete: {type: 'easeInEaseOut', property: 'opacity'},
      update: {type: 'easeInEaseOut'},
    } as const;

    const [messages, setMessages] = useState<ToastMessage[]>([]);

    const showToast = ({
      text,
      title,
      theme,
      duration: _duration,
      closeOnTap,
      renderToast,
    }: MessageOption) => {
      LayoutAnimation.configureNext(config);
      let _style = style;
      let _textStyle = textStyle;
      let _titleStyle = titleStyle;
      if (theme && themes[theme]) {
        _style = themes[theme].style;
        _textStyle = themes[theme].textStyle;
        _titleStyle = themes[theme].titleStyle;
      }
      const newMessage = {
        id: new Date().getTime(),
        text: text,
        duration: _duration || duration,
        style: _style,
        textStyle: _textStyle,
        titleStyle: _titleStyle,
        title,
        closeOnTap,
        renderToast,
      };
      setMessages(s => {
        if (s.length < maxToShow) {
          return [newMessage, ...s];
        }
        return s;
      });
      return newMessage.id;
    };

    const removeToast = (id: number) => {
      LayoutAnimation.configureNext(config);
      setMessages(ms => ms.filter(item => item.id !== id));
    };

    useImperativeHandle(
      ref,
      () => ({
        showToast,
      }),
      [showToast],
    );

    return (
      <View style={styles.container}>
        {messages.map((item, index) => (
          <Message
            key={item.id}
            index={index}
            removeToast={removeToast}
            renderToast={renderToast}
            {...item}
          />
        ))}
      </View>
    );
  },
);

export default Container;
