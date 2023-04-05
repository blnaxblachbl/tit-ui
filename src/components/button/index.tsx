import React, { forwardRef, useMemo } from "react";
import {
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  View,
  GestureResponderEvent,
} from "react-native";

import { styles } from "./styles";
import { ButtonProps } from "./types";

const Button = forwardRef<View, ButtonProps>(
  (
    {
      style,
      onPress = () => {},
      text = "Button",
      loading = false,
      textStyle,
      loadingColor = "#ffffff",
      children,
    },
    ref
  ) => {
    const _containerStyle = useMemo(() => [styles.container, style], [style]);
    const _textStyle = useMemo(() => [styles.text, textStyle], [textStyle]);

    const hundlePress = (event: GestureResponderEvent) => {
      if (!loading) {
        onPress(event);
      }
    };

    return (
      <TouchableWithoutFeedback onPress={hundlePress}>
        <View ref={ref} style={_containerStyle}>
          {loading ? (
            <ActivityIndicator
              animating={true}
              size="small"
              color={loadingColor ? loadingColor : "#ffffff"}
            />
          ) : children ? (
            children
          ) : (
            <Text numberOfLines={1} style={_textStyle}>
              {text}
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

export default Button;
