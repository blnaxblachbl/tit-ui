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

const { height } = Dimensions.get("window");

const getValue = (data: Data | undefined) => {
  if (typeof data === "string") {
    return data;
  }
  if (typeof data === "object") {
    return data?.value;
  }
  return "";
};

const getLabel = (data: Data | undefined) => {
  if (typeof data === "string") {
    return data;
  }
  if (typeof data === "object") {
    return data.value;
  }
  return "";
};

const Picker = forwardRef<PickerHandler, PickerProps>(
  (
    {
      containerStyle,
      pickerStyle,
      labelStyle,
      noteStyle,
      textStyle,
      placeholderTextColor = "gray",
      value,
      onPick = () => {},
      data = [],
      placeholder = "Pick something",
      label,
      initValue,
      note,
      onOpen = () => {},
      onClose = () => {},
      Left = null,
      Right = null,
      listProps = {},
      required = false,
      requiredTextStyle,
      requiredText = "*",
    },
    ref
  ) => {
    const refs = useRef(new Map()).current;
    const [text, setText] = useState<Data | undefined>(initValue);
    const [visible, setVisble] = useState<boolean>(false);
    const [reverse, setReverse] = useState(false);

    const _value = useMemo(() => value || text, [text, value]);
    const _textStyle = useMemo(() => [styles.value, textStyle], [textStyle]);

    const openPicker = () => {
      setVisble(true);
    };

    const pickItem = (item: Data) => {
      setText(item);
      onPick(item);
      closePicker();
    };

    const onShow = useCallback(async () => {
      const {
        width: _width,
        height: _height,
        x,
        y,
      } = await measure(refs.get("picker"));
      const inverted = y - _height / 2 > height / 2 ? true : false;
      setReverse(inverted);
      const listRef = refs.get("list");
      if (listRef) {
        if (_value && data.length > 0) {
          const index = data.findIndex(
            (item) => getValue(item) === getValue(_value)
          );
          if (index > -1) {
            listRef.scrollToIndex({
              index,
              viewOffset: normalize(21),
              animated: false,
            });
          }
        }
        listRef.setNativeProps({
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
    }, [onOpen, refs, setReverse, _value, data]);

    const closePicker = () => {
      setVisble(false);
      onClose();
    };

    useImperativeHandle(
      ref,
      () => ({
        value: _value as Data,
        setValue: setText,
        clear: () => setText(undefined),
        open: openPicker,
        close: closePicker,
        containerRef: refs.get("picker"),
      }),
      [_value, refs]
    );

    return (
      <View
        ref={(r) => refs.set("container", r)}
        style={[styles.container, containerStyle]}
      >
        {label && (
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && (
              <Text style={[styles.required, requiredTextStyle]}>
                {requiredText}
              </Text>
            )}
          </Text>
        )}
        <TouchableNativeFeedback onPress={openPicker}>
          <View
            ref={(r) => refs.set("picker", r)}
            style={[styles.picker, pickerStyle]}
          >
            {Left}
            {_value ? (
              <Text numberOfLines={1} style={_textStyle}>
                {getLabel(_value)}
              </Text>
            ) : (
              <Text style={[..._textStyle, { color: placeholderTextColor }]}>
                {placeholder}
              </Text>
            )}
            {Right}
          </View>
        </TouchableNativeFeedback>
        {note && <Text style={[styles.note, noteStyle]}>{note}</Text>}
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
              ref={(r) => refs.set("list", r)}
              data={data}
              pickItem={pickItem}
              reverse={reverse}
              _value={_value}
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
      ...listProps
    },
    ref
  ) => {
    const _renderImtem = ({ item, index, ...data }: TListRenderItem) => {
      const selected = getValue(item) === getValue(_value);
      if (renderItem) {
        return renderItem({ item, index, ...data } as TListRenderItem);
      }
      let selectedStyle = undefined;
      if (selected) {
        selectedStyle = selectedItemStyle || styles.selectedItem;
      }
      return (
        <TouchableNativeFeedback
          onPress={() => pickItem(item)}
          key={`picker-item-${index}`}
        >
          <Text style={[styles.listItemText, itemStyle, selectedStyle]}>
            {getLabel(item)}
          </Text>
        </TouchableNativeFeedback>
      );
    };

    return (
      <VirtualizedList
        ref={ref}
        style={[styles.list, style]}
        contentContainerStyle={[styles.listContainer, contentContainerStyle]}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        renderItem={_renderImtem}
        ListEmptyComponent={
          <Text style={[styles.listItemText, { color: "gray" }]}>
            {emptyText}
          </Text>
        }
        inverted={reverse}
        keyExtractor={(item) => getValue(item)}
        {...listProps}
      />
    );
  }
);

export default Picker;
