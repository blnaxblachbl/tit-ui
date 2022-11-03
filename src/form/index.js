import React, { Children, cloneElement, useCallback, useRef, forwardRef, isValidElement, useImperativeHandle } from "react"
import {
    View,
    StyleSheet
} from 'react-native'

const Form = forwardRef(({
    children,
    style,
    onSubmit = () => { },
    initValues
}, formRef) => {
    const refs = useRef(new Map()).current

    const submit = () => {
        const result = {}
        const keys = [...refs.keys()]
        keys.forEach(key => {
            const ref = refs.get(key)
            if (ref) {
                result[key] = ref.value
            }
        })
        onSubmit(result)
    }

    const renderChild = useCallback((child) => {
        if (isValidElement(child)) {
            if (child.props.name) {
                const key = child.props.name
                let initValue = undefined
                if (initValues) {
                    const value = initValues[key]
                    if (value){
                        initValue = value
                    }
                }
                const Child = forwardRef((props, ref) => cloneElement(child, { ...props, initValue, ref }))
                return <Child key={key} ref={r => refs.set(key, r)} />
            }
            if (child.props.type && child.props.type === 'submit') {
                return cloneElement(child, { ...child.props, onPress: submit }, child.props.children)
            }
            if (child.props.children) {
                let nextChilds
                if (Children.count(child.props.children) > 1) {
                    nextChilds = Children.map(child.props.children, (nextChild) => renderChild(nextChild))
                }
                if (Children.count(child.props.children) === 1) {
                    nextChilds = renderChild(child.props.children)
                }
                return cloneElement(child, child.props, nextChilds)
            }
        }
        return child
    }, [])

    useImperativeHandle(formRef, () => ({
        submit
    }), [])

    return (
        <View style={[styles.container, style]}>
            {Children.map(children, (child) => renderChild(child))}
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
})

export default Form