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
| Name         | Description | Default | Type |
| ------------ |-------------|---------|------|
| style        | style of Button component | object | style |
| textStyle    | style of button text | object | style | 
| onPress      | function that call when button pressed | onPress={()=>{}} | func |
| text         | text that will display on button | "Button" | string |
| loading      | boolean props that show or hide spinner, also if loading true function "onPress" will not be called | false | bool |
| loadingColor | color of loading spinner | "#ffffff" | string |