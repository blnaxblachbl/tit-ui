import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback
} from 'react-native'
import { normalize } from '../../functions/normalize'

const RadioButton = forwardRef(({
    containerStyle,
    innerCircleStyle,
    circleStyle,
    titleStyle,
    value,
    onPress = () => { },
    title,
    activeColor = "#494043",
    inactiveColor = "#494043",
    initValue = false,
}, ref) => {
    const [innerValue, setInnerValue] = useState(initValue)

    const _value = useMemo(() => typeof value === 'boolean' ? value : innerValue, [innerValue, value])

    const _onPress = useCallback(() => {
        setInnerValue(v => !v)
        if (typeof onPress === 'function') {
            onPress(!innerValue)
        }
    }, [onPress, innerValue])

    const _circleStyle = useMemo(() => ([
        styles.radioButton,
        circleStyle,
        {
            borderColor: _value ? activeColor : inactiveColor
        }
    ]), [circleStyle, _value, activeColor, inactiveColor])

    const _innerCircleStyle = useMemo(() => ([
        styles.radioCircle,
        innerCircleStyle,
        {
            backgroundColor: _value ? activeColor : inactiveColor
        }
    ]), [innerCircleStyle, _value, activeColor, inactiveColor])

    const _titleStyle = useMemo(() => ([
        styles.radioText, 
        titleStyle
    ]), [titleStyle])

    useImperativeHandle(ref, () => ({
        value: _value,
        setValue: setInnerValue
    }), [_value])

    return (
        <TouchableWithoutFeedback
            onPress={_onPress}
        >
            <View style={[styles.container, containerStyle]}>
                <View style={_circleStyle}>
                    {
                        _value ? (
                            <View style={_innerCircleStyle} />
                        ) : null
                    }
                </View>
                {
                    title ? (
                        <Text style={_titleStyle}>{title}</Text>
                    ) : null
                }
            </View>
        </TouchableWithoutFeedback>
    )
})

export default RadioButton

const styles = StyleSheet.create({
    container: {
        flexWrap: "nowrap",
        flexDirection: "row",
        width: "100%",
    },
    radioButton: {
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#494043',
        marginRight: 6,
    },
    radioText: {
        flex: 1,
        fontSize: normalize(14),
        color: "#494043",
        textAlignVertical: 'top'
    },
    radioCircle: {
        width: 12,
        height: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        backgroundColor: '#FF004A'
    },
})