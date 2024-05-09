## Provider

This is the store provider with simple logic - describe initial state and change it with one function. To it use:

1. **Wrap with Provider** - Wrap root component with Provider and describe initial states and custom reducers(optionaly).

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

type MyReducer = {
  type: MyReducerTypeName;
  data: any;
};

enum MyReducerTypeName {
  MULTIPLY = "MULTIPLY",
  SUBTRUCT = "SUBTRUCT",
  ADD = "ADD",
  CHANGE_NAME = "CHANGE_NAME",
}

const customReducer = (state: GlodalState, action: MyAction) => {
  switch (action.type) {
    case MyReducerTypeName.MULTIPLY: {
      return {
        ...state,
        count: state.count * action.data,
      };
    }
    case MyReducerTypeName.SUBTRUCT: {
      return {
        ...state,
        count: state.count - action.data,
      };
    }
    case MyReducerTypeName.ADD: {
      return {
        ...state,
        count: state.count + action.data,
      };
    }
    case MyReducerTypeName.ADD: {
      return {
        ...state,
        count: state.count + action.data,
      };
    }
    case MyReducerTypeName.CHANGE_NAME: {
      return {
        ...state,
        name: action.data,
      };
    }
    default:
      return state;
  }
};

return (
  <Provider<GlodalState, MyReducer>
    initValue={initValue}
    customReducer={customReducer}
  >
    <App />
  </Provider>
);
```

2. **Render states and change it** - use useStateValue hook to get states and change it, or use you custom reducers.

```tsx
import { useStateValue, useCustomDispatch } from "tit-ui";

type GlodalState = {
  count: number;
  name: string;
};

enum MyReducerTypeName {
  MULTIPLY = "MULTIPLY",
  SUBTRUCT = "SUBTRUCT",
  ADD = "ADD",
  CHANGE_NAME = "CHANGE_NAME",
}

//...

const [state, setState] = useStateValue<GlodalState>();

const subtruct = useCustomDispatch<number>(MyActionTypeName.SUBTRUCT);
const add = useCustomDispatch<number>(MyActionTypeName.ADD);
const changeName = useCustomDispatch<string>(MyActionTypeName.CHANGE_NAME);

return (
  <View style={{ flex: 1, alignItems: "center" }}>
    <Text style={{ marginVertical: 40 }}>Name value: {state.name}</Text>
    <Input
      value={state.name}
      onChangeText={(text) => {
        setState({ name: text });
        //or with custom reducer
        //changeName(text)
      }}
      placeholder="Enter name"
    />
    <Text style={{ marginVertical: 40 }}>Count value: {state.count}</Text>
    <View
      style={{
        width: "50%",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Button
        text="-"
        onPress={() => {
          setState({ count: state.count - 1 });
          //or with custom reducer
          //subtruct(1)
        }}
        style={{ width: 60 }}
      />
      <Button
        text="+"
        onPress={() => {
          setState({ count: state.count + 1 });
          //or with custom reducer
          //add(1)
        }}
        style={{ width: 60 }}
      />
    </View>
  </View>
);
```

![alt provider](https://github.com/blnaxblachbl/tit-ui/blob/main/images/provider.jpg?raw=true)

#### Props

| Name          | Description    | Default   | Type     |
| ------------- | -------------- | --------- | -------- |
| initValue     | initial states | {}        | object   |
| customReducer | custom reducer | undefined | function |

#### Hooks

| Name              | Description                                                                                                   | Return type                                     | Hook Arguments             |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------------------------- |
| useStateValue     | return states and function to change it                                                                       | [state: object, setState(data: object) => void] |                            |
| useCustomDispatch | return function that will execute custom reducer. hook generic type describe returned function arguments type | function                                        | custom reducer action type |
