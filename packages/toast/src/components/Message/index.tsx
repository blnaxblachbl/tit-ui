import React, {useEffect, useRef} from 'react';
import {Text, Animated, TouchableWithoutFeedback, View} from 'react-native';

import {MessgeProps} from '../../types';
import {styles} from './styles';

const Message = ({
  id,
  text,
  removeToast,
  index = 1,
  duration,
  style,
  textStyle,
  title,
  titleStyle,
  renderToast,
  closeOnTap = true,
}: MessgeProps) => {
  const translateY = useRef(new Animated.Value(-200 * (index + 1))).current;
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished && duration !== 'infinite') {
        timer.current = setTimeout(hideMessage, duration);
      }
    });
    return () => {
      clearTimeout(timer.current as NodeJS.Timeout);
    };
  }, []);

  const hideMessage = () => {
    removeToast(id);
  };

  const handleTap = () => {
    if (closeOnTap === true) {
      removeToast(id);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <Animated.View style={[styles.wrapper, {transform: [{translateY}]}]}>
        {renderToast ? (
          renderToast({
            id,
            text,
            removeToast,
            index,
            duration,
            style: [styles.container, style],
            textStyle: [styles.text, textStyle],
            title,
          })
        ) : (
          <View style={[styles.container, style]}>
            {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
            <Text style={[styles.text, textStyle]}>{text}</Text>
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Message;
