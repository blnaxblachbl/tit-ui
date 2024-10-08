## Input

text input UI component.

```tsx
//...
import { Input, InputHandler } from "tit-ui";
//...
const [text, setText] = useState("");
const inputRef = useRef<InputHandler>(null);

return (
  <View style={styles.container}>
    <Input
      ref={inputRef}
      placeholder="Some placeholder"
      label="This is label"
      note="This is note"
    />
  </View>
);
//...
```

![alt switch](https://github.com/blnaxblachbl/tit-ui/blob/main/gifs/textInput.gif?raw=true)

#### Props

| Name                              | Description                                                                                                                    | Default   | Type              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------- | ----------------- |
| ref                               | reference to component                                                                                                         | undefined | InputHandler      |
| value                             | value of TextInput component                                                                                                   | ""        | string            |
| containerStyle                    | style of container that includes input container, label and note                                                               | {}        | object            |
| inputContainerStyle               | style of input container that includes TextInput, Left and Right components                                                    | {}        | object            |
| inputStyle                        | style of TextInput component                                                                                                   | {}        | object            |
| labelStyle                        | style of label component on top of input that based on React-Native Text component                                             | {}        | object            |
| noteStyle                         | style of note component on bottom of input that based on React-Native Text component                                           | {}        | object            |
| label                             | text of label on top of input                                                                                                  | ""        | string            |
| note                              | text of note on bottom of input                                                                                                | ""        | string            |
| focusedBorderColor                | input container border color when TextInput is focused                                                                         | "#4666ff" | string            |
| focusedLabelColor                 | label text color when TextInput is focused                                                                                     | "#4666ff" | string            |
| Left                              | component that will render on left side of input                                                                               | null      | React Component   |
| Right                             | component that will render on right side of input                                                                              | null      | React Component   |
| required                          | boolean prop that let Form component to know that this input is required, also add "requiredText" to label                     | false     | boolean           |
| requiredText                      | label additation when input is required                                                                                        | \*        | string            |
| requiredTextStyle                 | style of "requiredText". Based on React-Native Text component                                                                  | {}        | object            |
| and all TextInput component props |                                                                                                                                |           | any               |
| themes                            | provide an object with all style props to configure your styled by theme. to lern more click [here](https://ui.tit.dev/themes) | undefined | InputThemesObject |
| theme                             | name of procided theme                                                                                                         | undefined | string            |
| styles in props                   | provide special props to quick style changes. to lern more click [here](https://ui.tit.dev/styles)                             |           |                   |

#### Methods

| Name              | Description                           | Return type                |
| ----------------- | ------------------------------------- | -------------------------- |
| inputRef          | reference to TextInput                | React-Native TextInput ref |
| containerRef      | reference to main container View      | React-Native View ref      |
| inputContainerRef | reference to TextInput container View | React-Native View ref      |
| getValue()        | getting value                         | string                     |
| setValue()        | setting value                         | none                       |
