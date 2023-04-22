## hexToRgba()

This is a function that can convert color hex value to rgb or rgba. To use it:

```tsx
import { hexToRgba } from "tit-ui";
//...
const color = "#c260b5";
const alpha = 0.2;
return (
  <View style={styles.container}>
    <Text>{color}</Text>
    <Text>{hexToRgba(color)}</Text>
    <Text>{hexToRgba(color, alpha)}</Text>
  </View>
);
```

![alt switch](https://github.com/blnaxblachbl/tit-ui/blob/main/images/hexToRgb.png?raw=true)
