import { forwardRef, useMemo } from "react";
import { Text, ActivityIndicator, View, Pressable } from "react-native";

import { styles } from "./styles";
import { ButtonProps } from "./types";
import { defaultThemes } from "./themes";

export * from "./types";

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      style,
      text = "Button",
      loading = false,
      textStyle,
      loadingColor,
      loadingSize,
      children,
      themes = defaultThemes,
      theme = "default",
      disabled,
      disabledStyle = styles.disabled,
      disabledTextStyle,
      Left = null,
      Right = null,
      ...props
    },
    ref
  ) => {
    const _theme = useMemo(() => themes[theme], [theme, themes]);
    const _containerStyle = useMemo(
      () => [styles.container, _theme?.style, style, disabled && disabledStyle],
      [style, _theme, disabled, disabledStyle]
    );
    const _textStyle = useMemo(
      () => [
        styles.text,
        _theme?.textStyle,
        textStyle,
        disabled && disabledTextStyle,
      ],
      [textStyle, _theme, disabledTextStyle]
    );

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        {...props}
        style={_containerStyle}
      >
        {loading ? (
          <ActivityIndicator
            animating={true}
            size={
              loadingSize ||
              _theme?.loadingSize ||
              defaultThemes["default"].loadingSize
            }
            color={
              loadingColor ||
              _theme?.loadingColor ||
              defaultThemes["default"].loadingColor
            }
          />
        ) : children ? (
          children
        ) : (
          <>
            {Left}
            <Text numberOfLines={1} style={_textStyle}>
              {text}
            </Text>
            {Right}
          </>
        )}
      </Pressable>
    );
  }
);
