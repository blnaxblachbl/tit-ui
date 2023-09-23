## Picker

Picker component like drop down menu.

```tsx
import { Picker } from "tit-ui";

const pickerRef = useRef<PickerHandler>(null);

return (
  <Picker
    data={["JavaScript", "Pyton", "C++", "C#", "Ruby", "Swift", "Go"]}
    label="Language"
    containerStyle={{ marginBottom: 12 }}
  />
);
```

![alt picker](https://github.com/blnaxblachbl/tit-ui/blob/main/gifs/picker.gif?raw=true)

#### Props

| Name                 | Description                                                                                                                                                                 | Default          | Type                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------------------------- |
| ref                  | reference to component                                                                                                                                                      | undefined        | PickerHandler                      |
| containerStyle       | style of component container                                                                                                                                                | {}               | object                             |
| pickerStyle          | style of picker container                                                                                                                                                   | {}               | object                             |
| labelStyle           | style of label component on top of picker that based on React-Native Text component                                                                                         | {}               | object                             |
| noteStyle            | style of note component on bottom of picker that based on React-Native Text component                                                                                       | {}               | object                             |
| textStyle            | style of picker value text, based on React-Native Text component                                                                                                            | {}               | object                             |
| placeholderTextColor | placeholder text color, like React-Native TextInput component placeholderTextColor prop                                                                                     | "gray"           | string                             |
| value                | value of picker - selected item of data array                                                                                                                               | undefined        | string or object                   |
| onPick               | callback when picker item is selected. (value) => { ... }                                                                                                                   | undefined        | function                           |
| data                 | array of values. Can be array of string (["1", "2", "3"]) or array of object ([{value: 1, label: "One"}, {value: 2, label: "Two"}]). Object must have a "value" and "label" | []               | array of string or array of object |
| placeholder          | text showing when value is empty                                                                                                                                            | "Pick something" | string                             |
| label                | text of label on top of picker                                                                                                                                              | ""               | string                             |
| note                 | text of label on top of picker                                                                                                                                              | ""               | string                             |
| initValue            | initial value of picker. Can be string of object. Object must have a "value" and "label"                                                                                    | ""               | string or object                   |
| onOpen               | callback on picker opened                                                                                                                                                   | undefined        | function                           |
| onClose              | callback on picker opened                                                                                                                                                   | undefined        | function                           |
| Left                 | component that will render on left side of picker                                                                                                                           | null             | React Component                    |
| Right                | component that will render on right side of picker                                                                                                                          | null             | React Component                    |
| listProps            | props of list of data. Based on React-Native VirtualizedList component                                                                                                      | {}               | object                             |
| required             | boolean prop that let Form component to know that this picker is required, also add "requiredText" to label                                                                 | false            | boolean                            |
| requiredText         | label additation when picker is required                                                                                                                                    | \*               | string                             |
| requiredTextStyle    | style of "requiredText". Based on React-Native Text component                                                                                                               | {}               | object                             |
| themes               | provide an object with all style props to configure your styled by theme. to lern more click [here](https://tit-ui.github.io/docs?page=themes)                                   | undefined        | PickerThemesObject                 |
| theme                | name of procided theme                                                                                                                                                      | undefined        | string                             |

#### listProps

| Name              | Description                                                                                        | Default                 | Type     |
| ----------------- | -------------------------------------------------------------------------------------------------- | ----------------------- | -------- |
| itemStyle         | style of list item. Based on React-Native Text component                                           | {}                      | object   |
| selectedItemStyle | style of selected list item. Based on React-Native Text component                                  | {}                      | object   |
| renderItem        | callback that must return some component to render. ({ item, index, selected, pickItem }) => {...} | undefined               | function |
| emptyText         | text when data array is empty                                                                      | 'There is nothing here' | string   |

#### Methods

| Name       | Description                    | Return type |
| ---------- | ------------------------------ | ----------- |
| value      | value of radio button          | bool        |
| setValue() | setting value                  | none        |
| clear()    | function to clear picker value | undefined   |
| open()     | function to open picker        | undefined   |
| close()    | function to close picker       | undefined   |
