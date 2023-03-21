import {
  forwardRef,
  useState,
  useImperativeHandle,
  useMemo,
  useRef,
  useCallback,
  ReactNode,
  RefObject,
} from "react";
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Modal,
  Text,
  Dimensions,
  VirtualizedList,
  StyleProp,
  ViewStyle,
  TextStyle,
  ListRenderItemInfo,
  VirtualizedListProps,
} from "react-native";

import { normalize } from "../../functions/normalize";
import { hexToRgba } from "../../functions/hexToRgba";
import { measure } from "../../functions/measure";

const { height } = Dimensions.get("window");

type DataObject = {
  value: string;
  title: string;
};

type Modify<T, R> = Omit<T, keyof R> & R;

type Data = DataObject | string;

interface renderItem extends ListRenderItemInfo<Data> {
  selected?: boolean;
  onPick?: (data: Data) => void;
}

interface ListProps extends Modify<VirtualizedListProps<Data>, renderItem> {
  pickItem: (data: Data) => void;
  reverse?: boolean;
  _value?: Data;
  selectedItemStyle?: StyleProp<TextStyle>;
  emptyText?: string;
  itemStyle?: StyleProp<TextStyle>;
}

export type PickerProps = {
  containerStyle?: StyleProp<ViewStyle>;
  pickerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  noteStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: string;
  value?: Data;
  onPick?: (data: Data) => void;
  data?: any[];
  placeholder?: string;
  label?: string;
  initValue?: Data;
  note?: string;
  onOpen?: () => void;
  onClose?: () => void;
  Left?: ReactNode;
  Right?: ReactNode;
  listProps?: any;
  required?: boolean;
  requiredTextStyle?: StyleProp<TextStyle>;
  requiredText?: string;
};

export type PickerHandler = {
  value: Data;
  setValue: (value: Data) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  containerRef: RefObject<View>;
};

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
    const _renderImtem = ({ item, index, ...data }: renderItem) => {
      const selected = getValue(item) === getValue(_value);
      if (renderItem) {
        return renderItem({ item, index, ...data } as renderItem);
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  picker: {
    width: "100%",
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A9A9A9",
    height: normalize(42),
  },
  label: {
    marginBottom: 6,
    fontSize: normalize(12),
    fontWeight: "bold",
    color: "#3c4043",
    width: "100%",
  },
  note: {
    fontSize: normalize(12),
    color: "#3c4043",
    width: "100%",
  },
  list: {
    width: "100%",
    maxHeight: 200,
    position: "absolute",
    opacity: 0,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 6,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  listContainer: {
    alignItems: "stretch",
  },
  value: {
    flex: 1,
    color: "#000",
    paddingHorizontal: normalize(12),
  },
  listItemText: {
    minHeight: normalize(42),
    textAlignVertical: "center",
    paddingHorizontal: normalize(12),
  },
  selectedItem: {
    backgroundColor: hexToRgba("#4666ff", 0.2),
    fontWeight: "bold",
  },
  required: {
    fontSize: 12,
    color: "red",
    letterSpacing: 3,
  },
});
