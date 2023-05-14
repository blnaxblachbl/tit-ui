import {
  forwardRef,
  useMemo,
  useImperativeHandle,
  useRef,
  useCallback,
  useState,
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
      autoFocus = false,
      focusedBorderColor = "#4666ff",
      focusedLabelColor = "#4666ff",
      initValue = "",
      required = false,
      requiredTextStyle,
      requiredText = "*",
      onChangeText = () => {},
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<View>(null);
    const inputRef = useRef<TextInput>(null);
    const labelRef = useRef<Text>(null);
    const [_value, setValue] = useState<string>(initValue);

    const _containerStyle = useMemo(
      () => [styles.container, containerStyle],
      [containerStyle]
    );
    const _inputContainerStyle = useMemo(
      () => [styles.inputContainer, inputContainerStyle],
      [inputContainerStyle]
    );
    const _labelStyle = useMemo(() => [styles.label, labelStyle], [labelStyle]);
    const _noteStyle = useMemo(() => [styles.note, noteStyle], [noteStyle]);

    const onFocusInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus(e);
        containerRef.current?.setNativeProps({
          style: {
            ..._inputContainerStyle,
            borderColor: focusedBorderColor,
          },
        });
        labelRef.current?.setNativeProps({
          style: {
            ..._labelStyle,
            color: focusedLabelColor,
          },
        });
      },
      [onFocus, labelRef.current, _inputContainerStyle, _labelStyle]
    );

    const onBlurInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur(e);
        containerRef.current?.setNativeProps({
          style: _inputContainerStyle,
        });
        labelRef.current?.setNativeProps({
          style: _labelStyle,
        });
      },
      [onBlur, labelRef.current, _inputContainerStyle, _labelStyle]
    );

    useImperativeHandle(
      ref,
      () => ({
        inputRef: inputRef.current,
        containerRef: containerRef.current,
        focused: inputRef.current?.isFocused(),
        value: _value,
        setValue: setValue,
      }),
      [_value, inputRef.current, containerRef.current]
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
        <View style={_inputContainerStyle}>
          {Left}
          <TextInput
            value={_value}
            ref={inputRef}
            style={[styles.input, inputStyle]}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            autoFocus={autoFocus}
            onChangeText={(text) => {
              setValue(text);
              onChangeText(text);
            }}
            {...props}
          />
          {Right}
        </View>
        {note && <Text style={_noteStyle}>{note}</Text>}
      </View>
    );
  }
);
