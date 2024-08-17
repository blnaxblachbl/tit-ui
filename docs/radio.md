## RadioButton

Radio button UI component.

```tsx
import { Radio, RadioButtonHandler } from "tit-ui";
//...
const [value, setValue] = useState(false);
const [value1, setValue1] = useState(false);
const radioRef = useRef<RadioButtonHandler>(null);
//...
return (
  <View style={styles.container}>
    <Radio
      value={value}
      title="Title"
      onPress={() => setValue(!value)}
      activeColor="red"
      inactiveColor="black"
      containerStyle={{ marginBottom: 12 }}
    />
    <Radio
      value={value1}
      title="Title 1"
      onPress={() => setValue1(!value1)}
      activeColor="red"
      inactiveColor="black"
    />
  </View>
);
```

![alt radio](https://github.com/blnaxblachbl/tit-ui/blob/main/gifs/radioButtons.gif?raw=true)

#### Props

| Name             | Description                                                                                                                    | Default          | Type                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ----------------------- |
| ref              | reference to component                                                                                                         | undefined        | RadioButtonHandler      |
| containerStyle   | style of the component container                                                                                               | object           | style                   |
| innerCircleStyle | style of the inner circle                                                                                                      | object           | style                   |
| circleStyle      | style of the outer circle                                                                                                      | object           | style                   |
| value            | value of button, if true button is checked                                                                                     | false            | bool                    |
| onPress          | function that call when button pressed                                                                                         | onPress={()=>{}} | func                    |
| title            | text that will display on right side of button                                                                                 | ""               | string                  |
| titleStyle       | style of title component based on React-Native Text component                                                                  | {}               | object                  |
| activeColor      | color of circles when button is checked                                                                                        | "#494043"        | string                  |
| inactiveColor    | color of circles when button is unchecked                                                                                      | "#494043"        | string                  |
| initValue        | initial value of button                                                                                                        | false            | bool                    |
| themes           | provide an object with all style props to configure your styled by theme. to lern more click [here](https://ui.tit.dev/themes) | undefined        | RadioButtonThemesObject |
| theme            | name of procided theme                                                                                                         | undefined        | string                  |
| styles in props  | provide special props to quick style changes. to lern more click [here](https://ui.tit.dev/styles)                             |                  |                         |

#### Methods

| Name       | Description   | Return type |
| ---------- | ------------- | ----------- |
| getValue() | getting value | bool        |
| setValue() | setting value | none        |
