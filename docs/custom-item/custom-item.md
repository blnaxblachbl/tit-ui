## How to use your own components in Form - deprecate, from 0.6

**STEP 1** - Create your own component. like this:

```tsx
import { useState } from "react";
import { TextInput } from "react-native";

const MyInput = (props) => {
  const [text, setText] = useState("");

  return (
    <TextInput value={text} onChangeText={(text) => setText(text)} {...props} />
  );
};

export default MyInput;
```

Now you should add some props to able Form component to use it - **name**, **initValue**, **required** and **onFormValueChange**.

**STEP 2** - forwarding reference:

```tsx
import { useState } from "react";
import { TextInput, TextInputProps } from "react-native";

type MyInputProps = TextInputProps & {
  name?: string; // <--- add this
  required?: boolean; // <--- add this
  initValue?: string; // <--- add this
  onFormValueChange?: (value: string) => void; // <--- add this
};

const MyInput = ({
  initValue = "",
  onFormValueChange = () => {},
  ...props,
}: MyInputProps) => {
  const [text, setText] = useState("");

  return (
    <TextInput
      value={text}
      defaultValue={initValue} // <--- add this
      onChangeText={(text) => {
        setText(text);
        onFormValueChange(text); // <--- add this
      }}
      {...props}
    />
  );
};

export default MyInput;
```

Well done! Now this component ready to be used in Form component.

I hope it's help.
