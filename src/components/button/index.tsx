import React, { forwardRef, ReactNode, useMemo } from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";

import { normalize } from "../../functions/normalize";

export type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  text?: string;
  loading?: boolean;
  textStyle?: StyleProp<TextStyle>;
  loadingColor?: string;
  children?: ReactNode;
};

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4666ff",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 12,
    height: normalize(42),
  },
  text: {
    color: "#FFFFFF",
  },
});
