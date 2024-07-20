import { forwardRef, useCallback, useMemo } from "react";
import { Text, ActivityIndicator, View, Pressable } from "react-native";

import { styles } from "./styles";
import { ButtonProps } from "./types";
import { defaultThemes } from "./themes";
import { usePropsToStyle } from "../../hooks/usePropsToStyle";

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
    const { viewStyles, textStyles } = usePropsToStyle(props);
    const _theme = useMemo(() => themes[theme], [theme, themes]);
    const _containerStyle = useMemo(
      () => [
        styles.container,
        _theme?.style,
        style,
        disabled && disabledStyle,
        viewStyles,
      ],
      [style, _theme, disabled, disabledStyle, viewStyles]
    );
    const _textStyle = useMemo(
      () => [
        styles.text,
        _theme?.textStyle,
        textStyle,
        disabled && disabledTextStyle,
        textStyles,
      ],
      [textStyle, _theme, disabledTextStyle, textStyles]
    );
    const activityIndicatorSize = useMemo(
      () =>
        loadingSize ||
        _theme?.loadingSize ||
        defaultThemes["default"].loadingSize,
      [_theme, loadingSize]
    );
    const activityIndicatorColor = useMemo(
      () =>
        loadingColor ||
        _theme?.loadingColor ||
        defaultThemes["default"].loadingColor,
      [_theme, loadingColor]
    );
    const renderText = useCallback(() => {
      if (children) {
        return children;
      }
      return (
        <Text numberOfLines={1} style={_textStyle}>
          {text}
        </Text>
      );
    }, [children, _textStyle]);

    return (
      <>
        <Pressable
          ref={ref}
          disabled={disabled}
          {...props}
          style={_containerStyle}
        >
          {loading ? (
            <ActivityIndicator
              animating={true}
              size={activityIndicatorSize}
              color={activityIndicatorColor}
            />
          ) : (
            <>
              {Left}
              {renderText()}
              {Right}
            </>
          )}
        </Pressable>
      </>
    );
  }
);
