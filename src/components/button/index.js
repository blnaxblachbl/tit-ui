import React, { forwardRef, useMemo } from 'react'
import {
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    ActivityIndicator,
    View
} from 'react-native'

import { normalize } from '../../functions/normalize'

const Button = forwardRef(({
    style,
    onPress = () => { },
    text = "Button",
    loading = false,
    textStyle,
    loadingColor = "#ffffff",
    children
}, ref) => {

    const _containerStyle = useMemo(() => ([styles.container, style]), [style])
    const _textStyle = useMemo(() => ([styles.text, textStyle]), [textStyle])

    const hundlePress = () => {
        if (!loading) {
            onPress()
        }
    }

    return (
        <TouchableWithoutFeedback onPress={hundlePress}>
            <View ref={ref} style={_containerStyle} >
                {
                    loading ? (
                        <ActivityIndicator
                            animating={true}
                            size='small'
                            color={loadingColor ? loadingColor : "#ffffff"}
                        />
                    ) : children ? children : <Text numberOfLines={1} style={_textStyle}>{text}</Text>
                }
            </View>
        </TouchableWithoutFeedback>
    )
})

export default Button

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4666ff",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: 12,
        height: normalize(42)
    },
    text: {
        color: '#FFFFFF',
    },
})