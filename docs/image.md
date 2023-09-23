## Image

Image component with scale.

```javascript
import { Image } from "tit-ui";

return (
  <Image
    source={{
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgrZ4O36TDysDmv3itq4KPoOVtE39kVgcC-NE0-iRp&s",
    }}
    style={{
      width: "100%",
      aspectRatio: 16 / 9,
    }}
    canScale
  />
);
```

![alt image](https://github.com/blnaxblachbl/tit-ui/blob/main/gifs/image.gif?raw=true)

#### Props

| Name                                       | Description                                                                                                                               | Default   | Type                                |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------- |
| source                                     | source to image                                                                                                                           | undefined | React-Native Image component source |
| canScale                                   | props to enable or disable scale                                                                                                          | false     | bool                                |
| showLoading                                | show spinner while image loading                                                                                                          | true      | bool                                |
| containerStyle                             | style of component container                                                                                                              | {}        | object                              |
| imageStyle                                 | style of React-Native Image component                                                                                                     | {}        | object                              |
| loadingContainerStyle                      | style of loading container                                                                                                                | {}        | object                              |
| loadingColor                               | color of loading spinner                                                                                                                  | {}        | string                              |
| loadingSize                                | size of loading spinner                                                                                                                   | "large"   | enum "large" or "small"             |
| and all React-Native Image component props |                                                                                                                                           |           | ImageProps                          |
| themes                                     | provide an object with all style props to configure your styled by theme. to lern more click [here](https://tit-ui.github.io/docs/themes) | undefined | TImageThemesObject                  |
| theme                                      | name of procided theme                                                                                                                    | undefined | string                              |
