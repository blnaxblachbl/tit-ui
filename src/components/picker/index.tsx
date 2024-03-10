import {
  forwardRef,
  useState,
  useImperativeHandle,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  View,
  TouchableNativeFeedback,
  Modal,
  Text,
  Dimensions,
  VirtualizedList,
} from "react-native";

import { normalize } from "../../functions/normalize";
import { measure } from "../../functions/measure";
import { styles } from "./styles";
import {
  Data,
  PickerHandler,
  PickerProps,
  ListProps,
  TListRenderItem,
} from "./types";
import { usePropsToStyle } from "../../hooks/usePropsToStyle";

const { height } = Dimensions.get("window");

export const ejectPickerValue = (data: Data | undefined) => {
  if (typeof data === "string") {
    return data;
  }
  if (typeof data === "object") {
    return data?.value;
  }
  return "";
};

export const ejectPickerLabel = (data: Data | undefined) => {
  if (typeof data === "string") {
    return data;
  }
  if (typeof data === "object") {
    return data?.title;
  }
  return "";
};

export * from "./types";

export const Picker = forwardRef<PickerHandler, PickerProps>(
  (
    {
      containerStyle,
      pickerStyle,
      labelStyle,
      noteStyle,
      textStyle,
      placeholderTextColor,
      value,
      data = [],
      placeholder = "Pick something",
      label,
      initValue,
      note,
      Left = null,
      Right = null,
      listProps = {},
      required = false,
      requiredTextStyle,
      requiredText = "*",
      theme,
      themes = {},
      onOpen = () => {},
      onClose = () => {},
      onPick = () => {},
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<View>(null);
    const pickerRef = useRef<View>(null);
    const listRef = useRef<VirtualizedList<Data>>(null);
    const [text, setText] = useState<Data | undefined>(initValue);
    const [visible, setVisble] = useState<boolean>(false);
    const [reverse, setReverse] = useState(false);

    const { viewStyles, textStyles: propsTextStyles } = usePropsToStyle(props);
    const _theme = useMemo(() => themes[theme], [theme, themes]);
    const _value = useMemo(() => value || text, [text, value]);
    const _textStyle = useMemo(
      () => [styles.value, textStyle, _theme?.textStyle, propsTextStyles],
      [textStyle, _theme, propsTextStyles]
    );
    const _containerStyle = useMemo(
      () => [
        styles.container,
        containerStyle,
        _theme?.containerStyle,
        viewStyles,
      ],
      [containerStyle, _theme, viewStyles]
    );

    const openPicker = useCallback(() => {
      setVisble(true);
    }, []);

    const onShow = useCallback(async () => {
      const {
        width: _width,
        height: _height,
        x,
        y,
      } = await measure(pickerRef.current);
      const inverted = y - _height / 2 > height / 2 ? true : false;
      setReverse(inverted);
      if (listRef.current) {
        if (_value && data.length > 0) {
          const index = data.findIndex(
            (item) => ejectPickerValue(item) === ejectPickerValue(_value)
          );
          if (index > -1) {
            listRef.current.scrollToIndex({
              index,
              viewOffset: normalize(21),
              animated: false,
            });
          }
        }
        //@ts-ignore
        listRef.current.setNativeProps({
          style: {
            width: _width,
            top: inverted ? undefined : y + _height + 2,
            bottom: inverted ? height - y + 2 : undefined,
            right: x,
            opacity: 1,
          },
        });
      }
      onOpen();
    }, [onOpen, setReverse, _value, data]);

    const closePicker = useCallback(() => {
      setVisble(false);
      onClose();
    }, [onClose]);

    const getValue = useCallback((): Data => {
      return _value;
    }, []);

    const pickItem = useCallback(
      (item: Data) => {
        setText(item);
        onPick(item);
        closePicker();
      },
      [onPick, closePicker]
    );

    useImperativeHandle(
      ref,
      () => ({
        value: _value as Data,
        setValue: setText,
        clear: () => setText(undefined),
        open: openPicker,
        close: closePicker,
        containerRef,
        getValue,
      }),
      [_value, getValue]
    );

    return (
      <View ref={containerRef} style={_containerStyle}>
        {label && (
          <Text style={[styles.label, _theme?.labelStyle, labelStyle]}>
            {label}
            {required && (
              <Text
                style={[
                  styles.required,
                  _theme?.requiredTextStyle,
                  requiredTextStyle,
                ]}
              >
                {requiredText}
              </Text>
            )}
          </Text>
        )}
        <TouchableNativeFeedback onPress={openPicker}>
          <View
            ref={pickerRef}
            style={[styles.picker, _theme?.pickerStyle, pickerStyle]}
          >
            {Left}
            {_value ? (
              <Text numberOfLines={1} style={_textStyle}>
                {ejectPickerLabel(_value)}
              </Text>
            ) : (
              <Text
                style={[
                  ..._textStyle,
                  {
                    color:
                      placeholderTextColor ||
                      _theme?.placeholderTextColor ||
                      "gray",
                  },
                ]}
              >
                {placeholder}
              </Text>
            )}
            {Right}
          </View>
        </TouchableNativeFeedback>
        {note && (
          <Text style={[styles.note, _theme?.noteStyle, noteStyle]}>
            {note}
          </Text>
        )}
        <Modal
          visible={visible}
          onRequestClose={() => {
            setVisble(false);
          }}
          animationType="none"
          onShow={onShow}
          transparent
        >
          <View
            style={{ flex: 1, backgroundColor: "transparent" }}
            onTouchEndCapture={closePicker}
          >
            <List
              ref={listRef}
              data={data}
              pickItem={pickItem}
              reverse={reverse}
              _value={_value}
              _theme={_theme}
              {...listProps}
            />
          </View>
        </Modal>
      </View>
    );
  }
);

const List = forwardRef<VirtualizedList<Data>, ListProps>(
  (
    {
      style,
      contentContainerStyle,
      renderItem,
      pickItem = () => {},
      reverse = false,
      _value,
      selectedItemStyle,
      emptyText = "There is nothing here",
      itemStyle,
      _theme,
      ...listProps
    },
    ref
  ) => {
    const _renderImtem = ({ item, index, ...data }: TListRenderItem) => {
      const selected = ejectPickerValue(item) === ejectPickerValue(_value);
      if (renderItem) {
        return renderItem({ item, index, ...data } as TListRenderItem);
      }
      let selectedStyle = undefined;
      if (selected) {
        selectedStyle =
          selectedItemStyle ||
          _theme?.listStyles?.selectedItemStyle ||
          styles.selectedItem;
      }
      return (
        <TouchableNativeFeedback
          onPress={() => pickItem(item)}
          key={`picker-item-${index}`}
        >
          <Text
            style={[
              styles.listItemText,
              _theme?.listStyles?.itemStyle,
              itemStyle,
              selectedStyle,
            ]}
          >
            {ejectPickerLabel(item)}
          </Text>
        </TouchableNativeFeedback>
      );
    };

    return (
      <VirtualizedList
        ref={ref}
        style={[styles.list, _theme?.listStyles?.style, style]}
        contentContainerStyle={[
          styles.listContainer,
          _theme?.listStyles?.contentContainerStyle,
          contentContainerStyle,
        ]}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        renderItem={_renderImtem}
        ListEmptyComponent={
          <Text style={[styles.listItemText, { color: "gray" }]}>
            {emptyText}
          </Text>
        }
        inverted={reverse}
        keyExtractor={(item) => ejectPickerValue(item)}
        {...listProps}
      />
    );
  }
);
