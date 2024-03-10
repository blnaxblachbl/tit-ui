## Avatar

This is UI component to render circle image and placeholder if image uri is undefined.

```javascript
import { Avatar } from "tit-ui";
//...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
});
//...

return (
  <View style={styles.container}>
    <Avatar
      source={{
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSsb3dnwW7TWK8zRGaCQ_ThqeLRWTZKXsWAL5z6rI_9UAwM0NqH",
      }}
      nameString="Tit Hardwood"
      badge={100}
    />
    <Avatar nameString="Tit Hardwood" badge={5} />
  </View>
);
```

![alt avatar](https://github.com/blnaxblachbl/tit-ui/blob/main/images/avatar.jpg?raw=true)

#### Props

| Name            | Description                                                                                                                                    | Default          | Type                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------- |
| source          | source to image                                                                                                                                | undefined        | React-Native Image component source |
| nameString      | string of user name or description                                                                                                             | ""               | string                              |
| onPress         | function that call when avatar pressed                                                                                                         | onPress={()=>{}} | func                                |
| badge           | used if you need to render badge on avatar                                                                                                     | 0                | number                              |
| style           | style of the component container                                                                                                               | {}               | style                               |
| imageStyle      | style of the image                                                                                                                             | {}               | style                               |
| badgeStyle      | style of the badge                                                                                                                             | {}               | style                               |
| badgeTextStyle  | style of the badge                                                                                                                             | {}               | style                               |
| imageProps      | React-Native Image component props                                                                                                             | undefined        | object                              |
| letterStyle     | style of letters of nameString when imageUrl is empty                                                                                          | {}               | style                               |
| themes          | provide an object with all style props to configure your styled by theme. to lern more click [here](https://tit-ui.github.io/docs?page=themes) | undefined        | AvatarThemesObject                  |
| theme           | name of procided theme                                                                                                                         | undefined        | string                              |
| styles in props | provide special props to quick style changes. to lern more click [here](https://tit-ui.github.io/docs?page=styles)                                              |                  |                                     |
