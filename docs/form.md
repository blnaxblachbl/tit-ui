## Form

Form is wrapper component that can return all named components value like web forms. Working with UI components of this library. If you can use web forms you know how to use this Form. All you need is:

1. **Name your components** - Provide a "name" props to component you want to take a value. This name will be key in returned result data object.

2. **Mark your required components** - Provide a "required" props to component you want to make it required. If required component doesn't filled submit function will return error object in result.

3. **Mark your trigger** - Provide a "type" props with string "submit" value to mark trigger. All pressable component can be a trigger. Form put "onSubmit" function into "onPress" props of it. And when trigger pressed values will pass to "onSubmit" function arguments.

4. **Provide a "onSubmit" function** - Provide a function in "onSubmit" props of Form compoent.

Thats it! Your form is ready. If you want to use your own component in Form, you should modify your component like [this](https://tit-ui.github.io/docs?page=custom-form-item).

```tsx
import {
  Form,
  Input,
  Picker,
  Radio,
  Switch,
  Button,
  FormHandler,
  FormSubmitArgs,
} from "tit-ui";

const formRef = useRef<FormHandler>(null);

type InitValues = {
  name: string;
  surname: string;
  switch?: boolean;
} 

const initValues: InitValues = {
  name: "Tit",
  surname: "Hardwood",
  switch: true,
}

const onSubmit = ({data, errors}: FormSubmitArgs<InitValues>) => {
  // result contains "data" and "errors"
  if (data) {
    //data will be "null" if form get errors
    console.log('result', data);
  }
  if (errors) {
    console.log('errors', errors);
  }
};

return (
  <Form<InitValues>
    ref={formRef}
    onSubmit={onSubmit}
    initValues={initValues}
  >
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Input
        placeholder="name"
        containerStyle={{ marginBottom: 12, width: "48%" }}
        label="Name"
        name="name" //this name prop
      />
      <Input
        placeholder="surname"
        containerStyle={{ marginBottom: 12, width: "48%" }}
        label="Surname"
        name="surname" //this name prop
      />
    </View>
    <Input
      placeholder="pass"
      label="Pass"
      containerStyle={{ marginBottom: 12 }}
      name="pass" //this name prop
    />
    <Picker
      data={["JavaScript", "Pyton", "C++", "C#", "Ruby", "Swift", "Go"]}
      label="Language"
      containerStyle={{ marginBottom: 12 }}
      placeholder="Select your favorite"
      required // this is required prop
    />
    <Radio
      name="check-box" //this name prop
      title="need your submition"
      containerStyle={{ marginBottom: 12 }}
    />
    <View style={{ flexDirection: "row", width: "100%" }}>
      <Switch
        name="switch" //this name prop
        containerStyle={{ marginBottom: 12 }}
      />
      <Text style={{ marginLeft: 6 }}>wont to subscribe to notificattion</Text>
    </View>
    <Button
      type="submit" //this is trigger props
      text="Submit"
    />
  </Form>
);
```

#### Props

| Name       | Description                                                                | Default   | Type          |
| ---------- | -------------------------------------------------------------------------- | --------- | ------------- |
| ref        | reference to component                                                     | undefined | SliderHandler |
| onSubmit   | Function that return values and errors by object ({data, errors}) => {...} | undefined | function      |
| initValues | object of initial values of form                                           | undefined | object        |

#### Methods

| Name     | Description                           | Return type |
| -------- | ------------------------------------- | ----------- |
| submit() | Method to trigger "onSubmit" function | none        |
