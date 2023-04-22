## Toast

This is the toast component to display global messages.

1. **Render Toast component** - Put Toast component in the root file.

```tsx
import { Provider } from "tit-ui";

type GlodalState = {
  count: number;
  name: string;
};

//...

const initValue = {
  count: 0,
  name: "",
} as GlodalState;

return (
  <Provider<GlodalState> initValue={initValue}>
    <App />
    <Toast maxToShow={4} duration={2000} /> {/*<-- here*/}
  </Provider>
);
```

1. **Display the message** - Call showToast function to disaplay a message.

```tsx
import { Button, showToast } from "tit-ui";

//...

return (
  <Button
    text="message"
    onPress={() => {
      showToast({
        title: "Success",
        text: "Everything fine",
        duration: 2000,
      });
    }}
  />
);
```

You can use default themes to display different types of message:

```tsx
import { Button, showToast } from "tit-ui";

//...

return (
  <Button
    text="message"
    onPress={() => {
      showToast({
        text: "Everything fine",
        duration: 20000,
        theme: DefaultThems.Success,
        title: "Success",
      });
      setTimeout(() => {
        showToast({
          text: "Something went wrong",
          duration: 20000,
          theme: DefaultThems.Error,
          title: "Error",
        });
      }, 100);
      setTimeout(() => {
        showToast({
          text: "This is the toast message",
          duration: 20000,
          theme: DefaultThems.Info,
          title: "Info",
        });
      }, 200);
      setTimeout(() => {
        showToast({
          text: "URL can't be an empty string",
          duration: 20000,
          theme: DefaultThems.Warning,
          title: "Warning",
        });
      }, 300);
    }}
  />
);
```

![alt toast-deafult-0](https://github.com/blnaxblachbl/tit-ui/blob/main/gifs/toasts.gif?raw=true)

![alt toast-deafult-1](https://github.com/blnaxblachbl/tit-ui/blob/main/images/toast/default-thems.jpg?raw=true)

You can use custom themes. Provide thems to the Toast component props:

```tsx
import { Provider } from "tit-ui";

type GlodalState = {
  count: number;
  name: string;
};

//...

const initValue = {
  count: 0,
  name: "",
} as GlodalState;

const themes = {
  mySuccess: {
    style: {
      backgroundColor: "#1fb141",
      elevation: 0,
      borderWidth: 0,
    },
    textStyle: {
      color: "white",
    },
    titleStyle: {
      color: "white",
    },
  },
  myError: {
    style: {
      backgroundColor: "red",
      elevation: 0,
      borderWidth: 0,
    },
    titleStyle: {
      color: "white",
    },
    textStyle: {
      color: "white",
    },
  },
} as const

return (
  <Provider<GlodalState> initValue={initValue}>
    <App />
    <Toast
      maxToShow={4}
      duration={2000}
      themes={themes}
    />
  </Provider>
);
```

```tsx
import { Button, showToast } from "tit-ui";

//...

return (
  <Button
    text="message"
    onPress={() => {
      showToast({
        text: "Everything fine",
        duration: 20000,
        theme: "mySuccess",
        title: "Success",
      });
      setTimeout(() => {
        showToast({
          text: "Something went wrong",
          duration: 20000,
          theme: "myError",
          title: "Error",
        });
      }, 100);
    }}
  />
);
```

![alt toasst-2](https://github.com/blnaxblachbl/tit-ui/blob/main/images/toast/custom-thems.jpg?raw=true)

You can use your custom toast message, like this:

```tsx
import { Provider } from "tit-ui";

type GlodalState = {
  count: number;
  name: string;
};

//...

const initValue = {
  count: 0,
  name: "",
} as GlodalState;

return (
  <Provider<GlodalState> initValue={initValue}>
    <App />
    <Toast
      maxToShow={4}
      duration={2000}
      renderToast={({ style, textStyle, text, title, removeToast, id }) => (
        <View style={style}>
          <Text style={[textStyle, { fontSize: 21 }]}>{title}</Text>
          <Text style={textStyle}>{text}</Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Button
              text="Ok"
              onPress={() => removeToast(id)}
              style={{ width: "48%" }}
            />
            <Button
              text="Cancel"
              onPress={() => removeToast(id)}
              style={{ width: "48%" }}
            />
          </View>
        </View>
      )}
    />
  </Provider>
);
```

Or like this:

```tsx
import { View, Text } from "react-native"
import { Button, showToast } from "tit-ui";

//...

return (
  <Button
    text="message"
    onPress={() => {
      showToast({
        text: "Do you want it?",
        duration: "infinite",
        title: "Confirm",
        closeOnTap: false,
        renderToast: ({ style, textStyle, text, title, removeToast, id }) => (
          <View style={style}>
            <Text style={[textStyle, { fontSize: 21 }]}>{title}</Text>
            <Text style={textStyle}>{text}</Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Button
                text="Ok"
                onPress={() => removeToast(id)}
                style={{ width: "48%" }}
              />
              <Button
                text="Cancel"
                onPress={() => removeToast(id)}
                style={{ width: "48%" }}
              />
            </View>
          </View>
        ),
      });
    }}
  />
);
```

![alt toasst-3](https://github.com/blnaxblachbl/tit-ui/blob/main/images/toast/custom-toast.jpg?raw=true)

#### Toast Props

Name | Description | Default | Type
------|-------------|----------|-----------
maxToShow | property to conrol messages count that will display on sceen | 3 | number;
duration | message displaying duration in milliseconds | 3000 | number or 'infinite';
themes | themes of messages | DefaultThems type | Theme type;
renderToast | function to render custom toast | undefined | (props: RenderToastProps) => ReactNode;

#### showToast

| Name        | Description                                        | Default   | Type                                    |
| ----------- | -------------------------------------------------- | --------- | --------------------------------------- |
| text        | text of the message                                | undefined | string                                  |
| title       | title of the message                               | undefined | string                                  |
| theme       | key of theme                                       | undefined | string                                  |
| duration    | message displaying duration in milliseconds        | 3000      | number or 'infinite';                   |
| closeOnTap  | if this property is true message will close on tap | true      | boolean                                 |
| renderToast | function to render custom toast                    | undefined | (props: RenderToastProps) => ReactNode; |
