## Button

UI component of button.

```tsx
//...
import { Button } from "tit-ui";
//...
return (
  <View style={styles.container}>
    <Button text="Button" />
  </View>
);
```

![alt button](https://github.com/blnaxblachbl/tit-ui/blob/main/images/button.png?raw=true)

#### Props

| Name              | Description                                                                                                                               | Default                 | Type                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------- |
| text              | text that will display on button                                                                                                          | "Button"                | string                                    |
| style             | style of Button component                                                                                                                 | undefined               | style                                     |
| textStyle         | style of button text                                                                                                                      | undefined               | style                                     |
| disabledStyle     | style of disabled Button component                                                                                                        | undefined               | style                                     |
| disabledTextStyle | style of disabled button text                                                                                                             | undefined               | style                                     |
| onPress           | function that call when button pressed                                                                                                    | undefined               | func                                      |
| loading           | boolean props that show or hide spinner, also if loading true function "onPress" will not be called                                       | false                   | bool                                      |
| loadingColor      | color of loading spinner                                                                                                                  | "#ffffff"               | string                                    |
| loadingSize       | size of loading spinner                                                                                                                   | "small"                 | number or 'small' or 'large' or undefined |
| Left              | component that will render on left side of Button component                                                                               | null                    | React Component                           |
| Right             | component that will render on right side of Button component                                                                              | null                    | React Component                           |
| themes            | provide an object with all style props to configure your styled by theme. to lern more click [here](https://tit-ui.github.io/docs/themes) | _check_ _code_ _bellow_ | ButtonThemesObject                        |
| theme             | name of procided theme                                                                                                                    | undefined               | string                                    |

#### Default Theme

```javascript
{
  default: {
    loadingColor: '#ffffff',
    loadingSize: 'small',
  },
  outlined: {
    style: {
      borderColor: '#4666ff',
      backgroundColor: 'transparent',
    },
    textStyle: {
      color: '#4666ff',
    },
    loadingColor: '#4666ff',
    loadingSize: 'small',
  },
}
```
