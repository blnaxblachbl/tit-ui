import {
  forwardRef,
  useMemo,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import {
  TextInput,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";

import { styles } from "./styles";
import { InputHandler, InputProps } from "./types";
import { usePropsToStyle } from "../../hooks/usePropsToStyle";

export * from "./types";

export const Input = forwardRef<InputHandler, InputProps>(
  (
    {
      containerStyle,
      inputContainerStyle,
      inputStyle,
      labelStyle,
      noteStyle,
      note,
      label,
      Left = null,
      Right = null,
      onBlur = () => {},
      onFocus = () => {},
      focusedBorderColor,
      focusedLabelColor,
      initValue = "",
      required = false,
      requiredTextStyle,
      requiredText = "*",
      onChangeText = () => {},
      theme = "",
      themes = {},
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<View>(null);
    const inputContainerRef = useRef<View>(null);
    const inputRef = useRef<TextInput>(null);
    const labelRef = useRef<Text>(null);
    const value = useRef<string>(initValue);

    const _theme = useMemo(() => themes[theme], [theme, themes]);
    const { viewStyles, textStyles } = usePropsToStyle(props);

    const _containerStyle = useMemo(
      () => [
        styles.container,
        _theme?.containerStyle,
        containerStyle,
        viewStyles,
      ],
      [containerStyle, _theme, viewStyles]
    );
    const _inputContainerStyle = useMemo(
      () => [
        styles.inputContainer,
        _theme?.inputContainerStyle,
        inputContainerStyle,
      ],
      [inputContainerStyle, _theme]
    );
    const _labelStyle = useMemo(
      () => [styles.label, _theme?.labelStyle, labelStyle],
      [labelStyle, _theme]
    );
    const _noteStyle = useMemo(
      () => [styles.note, _theme?.noteStyle, noteStyle],
      [noteStyle, _theme]
    );

    const onFocusInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus(e);
        inputContainerRef.current?.setNativeProps({
          style: {
            ..._inputContainerStyle,
            borderColor:
              focusedBorderColor || _theme?.focusedBorderColor || "#4666ff",
          },
        });
        labelRef.current?.setNativeProps({
          style: {
            ..._labelStyle,
            color: focusedLabelColor || _theme?.focusedLabelColor || "#4666ff",
          },
        });
      },
      [onFocus, _inputContainerStyle, _labelStyle, _theme]
    );

    const onBlurInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur(e);
        inputContainerRef.current?.setNativeProps({
          style: _inputContainerStyle,
        });
        labelRef.current?.setNativeProps({
          style: _labelStyle,
        });
      },
      [onBlur, _inputContainerStyle, _labelStyle]
    );

    const setValue = useCallback((text: string) => {
      value.current = text;
      inputRef.current?.setNativeProps({ text });
    }, []);

    const getValue = useCallback((): string => {
      return value.current;
    }, []);

    const _onChangeText = useCallback(
      (text: string) => {
        value.current = text;
        onChangeText(text);
      },
      [onChangeText]
    );

    useImperativeHandle(
      ref,
      () => ({
        inputRef: inputRef.current,
        inputContainerRef: inputContainerRef.current,
        containerRef: containerRef.current,
        setValue,
        getValue,
      }),
      [
        inputRef.current,
        containerRef.current,
        inputContainerRef.current,
        setValue,
        getValue,
      ]
    );

    return (
      <View ref={containerRef} style={_containerStyle}>
        {label && (
          <Text ref={labelRef} style={_labelStyle}>
            <>
              {label}
              {required && (
                <Text style={[styles.required, requiredTextStyle]}>
                  {requiredText}
                </Text>
              )}
            </>
          </Text>
        )}
        <View ref={inputContainerRef} style={_inputContainerStyle}>
          {Left}
          <TextInput
            ref={inputRef}
            style={[styles.input, _theme?.inputStyle, inputStyle, textStyles]}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            onChangeText={_onChangeText}
            defaultValue={initValue}
            {...props}
          />
          {Right}
        </View>
        {note && <Text style={_noteStyle}>{note}</Text>}
      </View>
    );
  }
);
