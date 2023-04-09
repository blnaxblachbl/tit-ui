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
      ...props
    },
    ref
  ) => {
    const refs = useRef(new Map()).current;
    const [focused, setFocused] = useState(autoFocus);
    const [_value, setValue] = useState(initValue);

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
        setFocused(true);
        refs.get("input-container").setNativeProps({
          style: {
            ..._inputContainerStyle,
            borderColor: focusedBorderColor,
          },
        });
        const labelRef = refs.get("label");
        if (labelRef) {
          refs.get("label").setNativeProps({
            style: {
              ..._labelStyle,
              color: focusedLabelColor,
            },
          });
        }
      },
      [onFocus, setFocused, refs, _inputContainerStyle, _labelStyle]
    );

    const onBlurInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur(e);
        setFocused(false);
        refs.get("input-container").setNativeProps({
          style: _inputContainerStyle,
        });
        const labelRef = refs.get("label");
        if (labelRef) {
          labelRef.setNativeProps({
            style: _labelStyle,
          });
        }
      },
      [onBlur, setFocused, refs, _inputContainerStyle, _labelStyle]
    );

    useImperativeHandle(
      ref,
      () => ({
        inputRef: refs.get("input"),
        containerRef: refs.get("input-container"),
        focused,
        value: _value,
        setValue: setValue,
      }),
      [refs, focused, _value]
    );

    return (
      <View ref={(r) => refs.set("container", r)} style={_containerStyle}>
        {label && (
          <Text ref={(r) => refs.set("label", r)} style={_labelStyle}>
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
        <View
          ref={(r) => refs.set("input-container", r)}
          style={_inputContainerStyle}
        >
          {Left}
          <TextInput
            value={_value}
            ref={(r) => refs.set("input", r)}
            style={[styles.input, inputStyle]}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            autoFocus={autoFocus}
            onChangeText={(text) => setValue(text)}
            {...props}
          />
          {Right}
        </View>
        {note && <Text style={_noteStyle}>{note}</Text>}
      </View>
    );
  }
);
