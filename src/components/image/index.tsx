import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image as RNImage,
  View,
  ActivityIndicator,
  Animated,
  PanResponder,
  Dimensions,
  NativeSyntheticEvent,
  ImageErrorEventData,
} from "react-native";

import { styles } from "./styles";
import { Point, TImageProps } from "./types";

const { width } = Dimensions.get("window");

const pointsDistance = ([xA, yA]: Point, [xB, yB]: Point): number => {
  return Math.sqrt(Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2));
};

export * from "./types";

export const Image = forwardRef<RNImage, TImageProps>(
  (
    {
      source = { uri: "" },
      canScale = false,
      showLoading = true,
      containerStyle,
      imageStyle,

      loadingContainerStyle,
      loadingColor,
      loadingSize,

      theme,
      themes = {},

      onLoadStart = () => {},
      onLoadEnd = () => {},
      onError = () => {},
      ...props
    },
    ref
  ) => {
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const scale = useRef(new Animated.Value(1)).current;
    const _theme = useMemo(() => themes[theme], [theme, themes]);
    let offsetDistance = 0;

    const [_source, setSource] = useState(source);
    const [loading, setLoading] = useState(false);

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (e, { dx, dy, numberActiveTouches }) => {
            if (numberActiveTouches === 2 && canScale && !loading) {
              const touches = e.nativeEvent.changedTouches;

              const touchA = touches[0];
              const touchB = touches[1];

              const distance = pointsDistance(
                [touchA.pageX, touchA.pageY],
                [touchB.pageX, touchB.pageY]
              );

              if (offsetDistance === 0) {
                offsetDistance = distance;
              } else {
                const screenMovedPercents = (distance - offsetDistance) / width;
                scale.setValue(1 + screenMovedPercents * 3);
                pan.setValue({
                  x: dx,
                  y: dy,
                });
              }
            }
          },
          onPanResponderRelease: () => {
            offsetDistance = 0;
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
            ]).start();
          },
        }),
      [canScale, offsetDistance]
    );

    const _onLoadStart = useCallback(() => {
      onLoadStart();
      setLoading(true);
    }, [onLoadStart, setLoading]);

    const _onLoadEnd = useCallback(() => {
      onLoadEnd();
      setLoading(false);
    }, [onLoadEnd, setLoading]);

    const _onError = useCallback(
      (error: NativeSyntheticEvent<ImageErrorEventData>) => {
        onError(error);
        setLoading(false);
        setSource({ uri: "" });
      },
      [onError, setLoading, setSource]
    );

    const _containerStyle = useMemo(
      () => [
        styles.container,
        _theme?.containerStyle,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale }],
        },
        containerStyle,
      ],
      [containerStyle, pan, scale, _theme]
    );

    const _imageStyle = useMemo(
      () => [styles.imageStyle, _theme?.imageStyle, imageStyle],
      [imageStyle, _theme]
    );

    const _loadingContainerStyle = useMemo(
      () => [
        styles.loading,
        _theme?.loadingContainerStyle,
        loadingContainerStyle,
      ],
      [loadingContainerStyle, _theme]
    );

    return (
      <Animated.View {...panResponder.panHandlers} style={_containerStyle}>
        <RNImage
          ref={ref}
          source={_source}
          onLoadStart={_onLoadStart}
          onLoadEnd={_onLoadEnd}
          onError={_onError}
          style={_imageStyle}
          {...props}
        />
        {loading && showLoading ? (
          <View style={_loadingContainerStyle}>
            <ActivityIndicator
              animating
              size={loadingSize || _theme?.loadingSize || 'large'}
              color={loadingColor || _theme?.loadingColor || '#000'}
            />
          </View>
        ) : null}
      </Animated.View>
    );
  }
);
