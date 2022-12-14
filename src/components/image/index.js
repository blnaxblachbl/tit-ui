import React, { forwardRef, useCallback, useMemo, useRef, useState } from "react"
import {
    Image as RNImage,
    View,
    ActivityIndicator,
    Animated,
    PanResponder,
    Dimensions,
    StyleSheet
} from 'react-native'

const { width } = Dimensions.get("window")

const pointsDistance = ([xA, yA], [xB, yB]) => {
    return Math.sqrt(
        Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2)
    )
}

const Image = forwardRef(({
    source = { uri: '' },
    canScale = false,
    showLoading = true,
    containerStyle,
    imageStyle,

    loadingContainerStyle,
    loadingColor = '#000',
    loadingSize = 'large',

    onLoadStart = () => { },
    onLoadEnd = () => { },
    onError = () => { },
    ...props
}, ref) => {
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
    const scale = useRef(new Animated.Value(1)).current
    let offsetDistance = 0

    const [_source, setSource] = useState(source)
    const [loading, setLoading] = useState(false)

    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, { dx, dy, numberActiveTouches }) => {
            if (numberActiveTouches === 2 && canScale && !loading) {
                const touches = e.nativeEvent.changedTouches

                const touchA = touches[0]
                const touchB = touches[1]

                const distance = pointsDistance(
                    [touchA.pageX, touchA.pageY],
                    [touchB.pageX, touchB.pageY]
                )

                if (offsetDistance === 0) {
                    offsetDistance = distance
                } else {
                    const screenMovedPercents = (distance - offsetDistance) / width
                    scale.setValue(1 + screenMovedPercents * 3)
                    pan.setValue({
                        x: dx,
                        y: dy,
                    })
                }
            }
        },
        onPanResponderRelease: () => {
            offsetDistance = 0
            Animated.parallel([
                Animated.spring(pan, {
                    toValue: {
                        x: 0,
                        y: 0,
                    },
                    useNativeDriver: true,
                }),
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true,
                }),
            ]).start()
        },
    }), [canScale, offsetDistance])

    const _onLoadStart = useCallback((e) => {
        onLoadStart(e)
        setLoading(true)
    }, [onLoadStart, setLoading])

    const _onLoadEnd = useCallback((e) => {
        onLoadEnd(e)
        setLoading(false)
    }, [onLoadEnd, setLoading])

    const _onError = useCallback((e) => {
        onError(e)
        setLoading(false)
        setSource({ uri: '' })
    }, [onError, setLoading, setSource])

    const _containerStyle = useMemo(() => ([
        styles.container,
        {
            transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                { scale },
            ],
        },
        containerStyle
    ]), [containerStyle, pan, scale])

    const _imageStyle = useMemo(() => ([
        styles.imageStyle,
        imageStyle,
    ]), [imageStyle])

    const _loadingContainerStyle = useMemo(() => ([
        styles.loading, 
        loadingContainerStyle
    ]), [loadingContainerStyle])

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={_containerStyle}
        >
            <RNImage
                ref={ref}
                source={_source}
                onLoadStart={_onLoadStart}
                onLoadEnd={_onLoadEnd}
                onError={_onError}
                style={_imageStyle}
                {...props}
            />
            {
                (loading && showLoading) ? (
                    <View style={_loadingContainerStyle}>
                        <ActivityIndicator
                            animating
                            size={loadingSize}
                            color={loadingColor}
                        />
                    </View>
                ) : null
            }
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    container: {
        width: '100%',
        overflow: 'hidden'
    },
    loading: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    imageStyle: {
        width: '100%',
        aspectRatio: 16 / 9
    }
})

export default Image