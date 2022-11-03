# How to use your own components in Form

You should modify your component to be able to return its value by reference.

Let me explain. **STEP 1** - Create your own component. like this:

```javascript
import { useState } from 'react'
import {
    TextInput,
} from 'react-native'

const MyInput = (props) => {
    const [text, setText] = useState("")

    return (
        <TextInput 
            value={text}
            onChangeText={text => setText(text)}
            {...props} 
        />
    )
}

export default MyInput
```

Ok. Thats was easy... Now you should forward the reference of this component, use **forwardRef** function of React.

**STEP 2** - forwarding reference:

```javascript
import { useState, forwardRef } from 'react' // <--- this function
import {
    TextInput,
} from 'react-native'

const MyInput = forwardRef((props, ref) => {
    const [text, setText] = useState("")

    return (
        <TextInput 
            value={text}
            onChangeText={text => setText(text)}
            {...props} 
        />
    )
})

export default MyInput
```

Greate! Now you should return component value by reference. To solve it, you need **useImperativeHandle** React hook.

**STEP 3** - returning value:

```javascript
import { useState, forwardRef, useImperativeHandle } from 'react' // <--- this hook
import {
    TextInput,
} from 'react-native'

const MyInput = forwardRef((props, ref) => {
    const [text, setText] = useState("")

    useImperativeHandle(ref, () => ({
        value: text // <--- returning value
    }), [text])

    return (
        <TextInput 
            value={text}
            onChangeText={text => setText(text)}
            {...props} 
        />
    )
})

export default MyInput
```

Well done! Now you can get component value by reference. And now this component ready to be used in Form component. Let me show you how to get value by reference:

```javascript
import MyInput from '../components/MyInput.js'
import { UI } from 'tit-ui'

const Screen = (props) => {
    const inputRef = useRef()

    const getValue = () => {
        // inputRef.current.value <--- this is the value of component
        console.log(inputRef.current.value)
    }

    return (
        <MyInput ref={inputRef} />
        <UI.Button
            text='Get value'
            onPress={getValue}
        />
    )
}

export default MyInput
```

I hope it's help. 
