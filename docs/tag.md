## Tag

Tag for markup.

```tsx
import { Tag } from "tit-ui";
//...
return (
  <View
    style={{
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
    }}
  >
    <Tag text="default" />
    <Tag text="red" color="red" />
    <Tag text="orange" color="orange" />
    <Tag text="lime" color="lime" />
    <Tag text="yellow" color="yellow" />
    <Tag text="green" color="green" />
    <Tag text="blue" color="blue" />
    <Tag text="purple" color="purple" />
  </View>
);
```

![alt switch](https://github.com/blnaxblachbl/tit-ui/blob/main/images/tag.jpg?raw=true)
![alt switch](https://github.com/blnaxblachbl/tit-ui/blob/main/gifs/tag.gif?raw=true)

#### Props

| Name            | Description                                                                                     | Default          | Type                                                           |
| --------------- | ----------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------- |
| text            | text of tag                                                                                     | "tag"            | string                                                         |
| onPress         | function that call when tag pressed                                                             | onPress={()=>{}} | func                                                           |
| style           | style of the component container                                                                | undefined        | style                                                          |
| textStyle       | style of tag text                                                                               | undefined        | style                                                          |
| color           | color of tag                                                                                    | undefined        | on of ['red','orange','yellow','lime','green','blue','purple'] |
| Left            | component that will render on left side of tag text                                             | null             | React Component                                                |
| Right           | component that will render on right side of tag text                                            | null             | React Component                                                |
| loading         | boolean props that show or hide spinner                                                         | false            | bool                                                           |
| loadingProps    | ActivityIndicator Props                                                                         | undefined        | ActivityIndicatorProps                                         |
| styles in props | provide special props to quick style changes. to lern more click [here](https://tit.dev/styles) |                  |                                                                |
