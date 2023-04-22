## Provider

This is the store provider with simple logic - describe initial state and change it with one function. To it use:

1. **Wrap with Provider** - Wrap root component with Provider and describe initial states.

```tsx
import { Provider } from 'tit-ui'

type GlodalState = {
  count: number;
  name: string;
};

//...

const initValue = {
    count: 0,
    name: ''
} as GlodalState

return (
    <Provider<GlodalState> initValue={initValue}>
        <App />
    </Provider>
);
```

2. **Render states and change it** - use useStateValue hook to get states and change it.

```tsx
import { useStateValue } from 'tit-ui'

type GlodalState = {
  count: number;
  name: string;
};

//...

const [state, setState] = useStateValue<GlodalState>();

return (
    <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{marginVertical: 40}}>Name value: {state.name}</Text>
        <Input
            value={state.name}
            onChangeText={text => setState({name: text})}
            placeholder="Enter name"
        />
        <Text style={{marginVertical: 40}}>Count value: {state.count}</Text>
        <View
            style={{
                width: '50%',
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}>
            <Button
                text="-"
                onPress={() => {
                    setState({count: state.count - 1});
                }}
                style={{width: 60}}
            />
            <Button
                text="+"
                onPress={() => {
                    setState({count: state.count + 1});
                }}
                style={{width: 60}}
            />
        </View>
    </View>
)
```

![alt provider](https://github.com/blnaxblachbl/tit-ui/blob/main/images/provider.jpg?raw=true)

#### Props

| Name      | Description    | Default | Type   |
| --------- | -------------- | ------- | ------ |
| initValue | initial states | {}      | object |

#### Hooks

| Name          | Description                             | Return type                                     |
| ------------- | --------------------------------------- | ----------------------------------------------- |
| useStateValue | return states and function to change it | [state: object, setState(data: object) => void] |
