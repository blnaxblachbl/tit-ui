## Switch

Switch UI component:

```tsx
import { Switch, SwitchHandler } from "tit-ui";

const [switchState, setSwitchState] = useState<boolean>(false);
const switchRef = useRef<SwitchHandler>(null);

//...

return (
  <View style={styles.container}>
    <Switch ref={switchRef} />
    <Switch
      textStyle={{
        fontSize: 20,
      }}
      containderStyle={{
        width: "50%",
        height: 50,
        marginTop: 15,
      }}
      circleStyle={{
        width: "50%",
        height: 40,
        borderRadius: 20,
      }}
      enabledCircleColor="#4DC861"
      disabledCircleColor="red"
      enabledText="On"
      disabledText="Off"
      enabledBackgroundColor="#ccc"
      disabledBackgroundColor="#ccc"
      onChangeState={(switchState) => setSwitchState(switchState)}
      initValue={true}
    />
  </View>
);

//...
```

![alt switch](https://github.com/blnaxblachbl/tit-ui/blob/main/gifs/switch.gif?raw=true)

#### Props

| Name                    | Description                               | Default                      | Type          |
| ----------------------- | ----------------------------------------- | ---------------------------- | ------------- |
| ref                     | reference to component                    | undefined                    | SwitchHandler |
| value                   | value of switch                           | undefined                    | bool          |
| initValue               | initial position                          | false                        | bool          |
| textStyle               | switch text style                         | undefined                    | style         |
| containerStyle          | switch container style                    | undefined                    | style         |
| circleStyle             | switch circle style                       | undefined                    | style         |
| enabledCircleColor      | color for circle of switch when it is on  | '#fff'                       | string        |
| disabledCircleColor     | color for circle of switch when it is off | '#fff'                       | string        |
| enabledText             | text of switch when it is on              | undefined                    | string        |
| disabledText            | text of switch when it is off             | undefined                    | string        |
| enabledBackgroundColor  | switch background color when it is on     | '#4666ff'                    | string        |
| disabledBackgroundColor | switch background color when it is off    | '#ccc'                       | string        |
| onChangeState           | callback when switch is clicked           | (value) => {callback(value)} | func          |

#### Methods

| Name       | Description     | Return type |
| ---------- | --------------- | ----------- |
| value      | value of switch | bool        |
| setValue() | setting value   | none        |
