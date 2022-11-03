import { forwardRef, useMemo, useImperativeHandle, useRef, useCallback, useState } from 'react'
import {
    TextInput,
    View,
    Text,
    StyleSheet
} from 'react-native'

import { normalize } from '../../functions/normalize'

const Input = forwardRef(({
    containerStyle,
    inputContainerStyle,
    inputStyle,
    labelStyle,
    noteStyle,
    note,
    label,
    Left = null,
    Right = null,
    onBlur = () => { },
    onFocus = () => { },
    autoFocus = false,
    focusedBorderColor = "#4666ff",
    focusedLabelColor = "#4666ff",
    initValue = '',
    ...props
}, ref) => {
    const refs = useRef(new Map()).current
    const [focused, setFocused] = useState(autoFocus)
    const [_value, setValue] = useState(initValue)

    const _containerStyle = useMemo(() => ([styles.container, containerStyle]), [containerStyle])
    const _inputContainerStyle = useMemo(() => ([styles.inputContainer, inputContainerStyle]), [inputContainerStyle])
    const _labelStyle = useMemo(() => ([styles.label, labelStyle]), [labelStyle])
    const _noteStyle = useMemo(() => ([styles.note, noteStyle]), [noteStyle])

    const onFocusInput = useCallback((e) => {
        onFocus(e)
        setFocused(true)
        refs.get("input-container").setNativeProps({
            style: {
                ..._inputContainerStyle,
                borderColor: focusedBorderColor
            }
        })
        const labelRef = refs.get("label")
        if (labelRef) {
            refs.get("label").setNativeProps({
                style: {
                    ..._labelStyle,
                    color: focusedLabelColor
                }
            })
        }
    }, [onFocus, setFocused, refs, _inputContainerStyle, _labelStyle])

    const onBlurInput = useCallback((e) => {
        onBlur(e)
        setFocused(false)
        refs.get("input-container").setNativeProps({
            style: _inputContainerStyle
        })
        const labelRef = refs.get("label")
        if (labelRef) {
            labelRef.setNativeProps({
                style: _labelStyle
            })
        }
    }, [onBlur, setFocused, refs, _inputContainerStyle, _labelStyle])

    useImperativeHandle(ref, () => ({
        inputRef: refs.get("input"),
        focused,
        value: _value,
        setValue: setValue
    }), [refs, focused, _value])

    return (
        <View style={_containerStyle}>
            {label && <Text ref={r => refs.set("label", r)} style={_labelStyle}>{label}</Text>}
            <View ref={r => refs.set("input-container", r)} style={_inputContainerStyle}>
                {Left}
                <TextInput
                    value={_value}
                    ref={r => refs.set("input", r)}
                    style={[styles.input, inputStyle]}
                    onFocus={onFocusInput}
                    onBlur={onBlurInput}
                    autoFocus={autoFocus}
                    onChangeText={text => setValue(text)}
                    {...props}
                />
                {Right}
            </View>
            {note && <Text style={_noteStyle}>{note}</Text>}
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    inputContainer: {
        width: '100%',
        borderRadius: 6,
        paddingHorizontal: normalize(12),
        backgroundColor: "#F5F5F5",
        height: normalize(42),
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#3c4043'
    },
    input: {
        flex: 1,
        fontSize: normalize(14),
        height: '100%'
    },
    label: {
        marginBottom: 6,
        fontSize: normalize(12),
        fontWeight: 'bold',
        color: '#3c4043',
        width: '100%'
    },
    note: {
        fontSize: normalize(12),
        color: '#3c4043',
        width: '100%'
    }
})

export default Input 