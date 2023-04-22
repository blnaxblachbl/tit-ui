## normalize()

This is a function which normalizes the pixel sizes relative to the screen size.

```tsx
import { normalize } from "tit-ui";

//...

return (
  <View style={styles.container}>
    <Text
      style={{
        fontSize: normalize(14),
        color: "#000000",
        marginBottom: normalize(15),
      }}
    >
      Some text
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
```
