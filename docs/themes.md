## How to use component Themes

Some component have `themes` and `theme` props. You can use them to provide JSON with different style props and switch between those.

Let create button component for example:

```tsx
import { Button, ButtonProps } from "tit-ui";

const MyButton = (props: ButtonProps) => {
  return (
    <Button
      themes={{
        blue: { //this key will be used as theme name
          style: {
            backgroundColor: "blue",
          },
          textStyle: {
            color: "#f1f1f1",
          },
          loadingColor: "#fff",
          loadingSize: "small",
        },
        red: { //this key will be used as theme name
          style: {
            backgroundColor: "red",
            borderRadius: 24,
          },
          textStyle: {
            color: "black",
            fontWeight: "bold",
          },
          loadingColor: "black",
          loadingSize: "small",
        },
      }}
      {...props}
    />
  );
};

export default MyButton;
```

Now we can use `theme` prop to switch between themes, just provide name of theme.

```tsx
import { View } from "react-native";
import MyButton from "@components/MyButton";

const App = () => {
  return (
    <View>
      <MyButton
        theme="red" //red or blue
      />
    </View>
  );
};

export default MyButton;
```

![alt button](https://github.com/blnaxblachbl/tit-ui/blob/main/images/red-button.jpg?raw=true)
![alt button](https://github.com/blnaxblachbl/tit-ui/blob/main/images/blue-button.jpg?raw=true)
