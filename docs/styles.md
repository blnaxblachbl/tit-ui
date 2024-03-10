## Styles in Props

Most of UI components support "Styles in Props", thats mean you can provide them special prop, like: "mb" - "marginBottom", to change style quickly.

For example, we have a button and at some places it need marginBottom.

To solve this we usually do this:

```jsx
//...
import { StyleSheet } from "react-native";
//...
import { Button } from "tit-ui";
//...
return (
  <View style={styles.container}>
    <Button text="Button" style={styles.mareSpace} />
  </View>
);
//...
const styles = StyleSheet.create({
  //...
  mareSpace: {
    marginBottom: 12,
  },
});
```

instead we can use "Styles in Props":

```jsx
import { Button } from "tit-ui";
//...
return (
  <View style={styles.container}>
    <Button text="Button" mb={12} />
  </View>
);
```

#### List of Props

| Short name | Style name              |
| ---------- | ----------------------- |
| w          | width                   |
| h          | height                  |
| m          | margin                  |
| mt         | marginTop               |
| mr         | marginRight             |
| mb         | marginBottom            |
| ml         | marginLeft              |
| mh         | marginHorizontal        |
| mv         | marginVertical          |
| pt         | paddingTop              |
| pr         | paddingRight            |
| pb         | paddingBottom           |
| pl         | paddingLeft             |
| ph         | paddingHorizontal       |
| pv         | paddingVertical         |
| bc         | backgroundColor         |
| bobc       | borderBottomColor       |
| bober      | borderBottomEndRadius   |
| boblr      | borderBottomLeftRadius  |
| bobrr      | borderBottomRightRadius |
| bobsr      | borderBottomStartRadius |
| bobw       | borderBottomWidth       |
| boc        | borderColor             |
| boec       | borderEndColor          |
| bolc       | borderLeftColor         |
| bolw       | borderLeftWidth         |
| bor        | borderRadius            |
| borc       | borderRightColor        |
| borw       | borderRightWidth        |
| bosc       | borderStartColor        |
| bos        | borderStyle             |
| botc       | borderTopColor          |
| boter      | borderTopEndRadius      |
| botlr      | borderTopLeftRadius     |
| botrr      | borderTopRightRadius    |
| botsr      | borderTopStartRadius    |
| botw       | borderTopWidth          |
| bow        | borderWidth             |
| tc         | color                   |
| ff         | fontFamaly              |
| fw         | fontWeight              |
| fs         | fontSize                |

### How to use in custom component

Use "usePropsToStyle" hook to convert "Styles in Props" to styles. If you use TypeScript also use "StyleInProps" type to extends component type.

```jsx
import { Pressable } from "react-native";
import { usePropsToStyle } from "tit-ui";

export type CustomButtonProps = StyleInProps & {
  onPress: () => void,
  text: string,
};

export default CustomButton = ({ onPress, text, ...props }) => {
  const { textStyles, viewStyles } = usePropsToStyle(props);

  return (
    <Pressable style={[styles.container, viewStyles]}>
      <Text style={[styles.text, textStyles]}>{text}</Text>
    </Pressable>
  );
};
```
