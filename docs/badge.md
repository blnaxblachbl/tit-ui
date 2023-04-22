## Badge 
The UI component to render a numerical value.

```javascript
import { Badge } from "tit-ui";
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
    <Badge badge={1} />
    <Badge badge={12} />
    <Badge badge={123} />
  </View>
);
```

![alt badge](https://github.com/blnaxblachbl/tit-ui/blob/main/images/badge.jpg?raw=true)

#### Props

| Name      | Description                                | Default   | Type   |
| --------- | ------------------------------------------ | --------- | ------ |
| badge     | used if you need to render badge on avatar | 0         | number |
| style     | style of the component container           | undefined | style  |
| textStyle | style of the badge value                   | undefined | style  |
