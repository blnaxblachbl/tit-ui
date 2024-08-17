## FlatList - deprecate, from 0.6

This is modified React-Native FlatList component.

```javascript
import { FlatList, Image } from "tit-ui";

return (
  <FlatList
    data={new Array(10).fill({})}
    style={{ flex: 1 }}
    contentContainerStyle={{ padding: 12, alignItems: "center" }}
    loading={true}
    renderItem={() => (
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgrZ4O36TDysDmv3itq4KPoOVtE39kVgcC-NE0-iRp&s",
        }}
        style={{
          width: width - 30,
          aspectRatio: 16 / 9,
          marginBottom: 12,
        }}
        canScale
      />
    )}
  />
);
```

![alt flatlist](https://github.com/blnaxblachbl/tit-ui/blob/main/gifs/flat-list.gif?raw=true)

#### Props

| Name                             | Description                                                                                                                 | Default                 | Type                   |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------- |
| loading                          | if this property is true refresh controll or LoadingConponent is showing up                                                 | false                   | bool                   |
| onRefresh                        | RefreshControl onRefresh property                                                                                           | () => {}                | function               |
| LoadinComponent                  | component that will be showing up instead of ListEmptyComponent if loading true                                             | null                    | React-Native component |
| useRefreshControl                | if true used RefreshControll component to FlatList                                                                          | true                    | bool                   |
| emptyComponenText                | Default ListEmptyComponent text                                                                                             | "There is nothing here" | string                 |
| and all FlatList component props |                                                                                                                             |                         | any                    |
| themes                           | provide an object with all style props to configure your styled by theme. to lern more click [here](https://tit.dev/themes) | undefined               | FlatListThemesObject   |
| theme                            | name of procided theme                                                                                                      | undefined               | string                 |
