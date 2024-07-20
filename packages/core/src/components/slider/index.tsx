import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Animated, View, PanResponder, LayoutChangeEvent } from "react-native";

import { styles } from "./styles";
import { SliderProps, SliderHandler, SliderSetValueOpotion } from "./types";
import { usePropsToStyle } from "../../hooks/usePropsToStyle";

export * from "./types";

export const Slider = forwardRef<SliderHandler, SliderProps>(
  (
    {
      style,
      trackStyle,
      circleStyle,
      circleSize,
      minValue = 0,
      maxValue = 100,
      circleIsScale = true,
      circleMaxScale = 1.3,
      CustomCircle = null,
      initValue = minValue,
      theme,
      themes = {},
      onValueChange = () => {},
      ...props
    },
    ref
  ) => {
    const scale = useRef(new Animated.Value(1)).current;
    const pan = useRef(new Animated.Value(0)).current;
    const lastValue = useRef<number>(initValue);
    const containerRef = useRef<View>(null);
    const [trackWidth, setTrackWidth] = useState<number>(0);

    const { viewStyles } = usePropsToStyle(props);
    const _theme = useMemo(() => themes[theme], [theme, themes]);

    const offset = useMemo(() => {
      const size = circleSize || _theme?.circleSize || 30;
      return size / 2;
    }, [circleSize, _theme]);

    const step = useMemo(
      () => trackWidth / (maxValue - minValue),
      [trackWidth, maxValue, minValue]
    );

    const containerStyle = useMemo(() => {
      const height = circleSize || _theme?.circleSize || 30;
      const paddingHorizontal = height / 2;
      return [
        styles.container,
        {
          height,
          paddingHorizontal,
        },
        _theme?.style,
        style,
        viewStyles,
      ];
    }, [_theme, circleSize, style, viewStyles]);

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pan.setOffset((pan as any)._value);
        },
        onPanResponderMove: Animated.event([null, { dx: pan }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: () => {
          pan.flattenOffset();
        },
      })
    ).current;

    const translateX = pan.interpolate({
      inputRange: [0, trackWidth],
      outputRange: [-offset, trackWidth - offset],
      extrapolate: "clamp",
    });

    translateX.addListener(({ value }) => {
      const newValue = Math.floor((value + offset) / step) + minValue;
      if (!isNaN(newValue) && lastValue.current !== newValue) {
        lastValue.current = newValue;
        onValueChange(newValue);
      }
    });

    const RenderCircle = useMemo(() => {
      if (CustomCircle) return CustomCircle;
      return (
        <View
          style={[
            styles.circle,
            _theme?.circleStyle,
            circleStyle,
            {
              width: circleSize || _theme?.circleSize || 30,
              height: circleSize || _theme?.circleSize || 30,
            },
          ]}
        />
      );
    }, [CustomCircle, circleSize, circleStyle, _theme]);

    const onTouchStart = useCallback(() => {
      if (circleIsScale) {
        Animated.spring(scale, {
          toValue: circleMaxScale,
          useNativeDriver: true,
        }).start();
      }
    }, [circleIsScale, circleMaxScale]);

    const onTouchEnd = useCallback(() => {
      if (circleIsScale) {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
      }
    }, [circleIsScale]);

    const onTrackLayout = useCallback((e: LayoutChangeEvent) => {
      if (e.nativeEvent.layout.width !== trackWidth) {
        setTrackWidth(e.nativeEvent.layout.width);
        const newValue =
          ((lastValue.current - minValue) * e.nativeEvent.layout.width) /
          (maxValue - minValue);
        pan.setValue(newValue);
      }
    }, []);

    const setValue = useCallback(
      (value: number, options?: SliderSetValueOpotion) => {
        if (lastValue.current !== value) {
          const newValue = (value - minValue) * step;
          if (options?.animated !== false) {
            Animated.timing(pan, {
              toValue: newValue,
              duration: 300,
              useNativeDriver: true,
            }).start(({ finished }) => {
              if (finished) {
                pan.setValue(newValue);
              }
            });
          } else {
            pan.setValue(newValue);
          }
        }
      },
      []
    );

    const getValue = useCallback(() => lastValue.current, []);

    useEffect(() => {
      return () => {
        pan.removeAllListeners();
      };
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        containerRef: containerRef.current,
        setValue,
        getValue,
      }),
      [setValue, getValue]
    );

    return (
      <View ref={containerRef} style={containerStyle}>
        <View
          onLayout={onTrackLayout}
          style={[styles.track, _theme?.trackStyle, trackStyle]}
        >
          <Animated.View
            {...panResponder.panHandlers}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={[
              styles.circleContainer,
              {
                transform: [{ translateX }, { scale }],
              },
            ]}
          >
            {RenderCircle}
          </Animated.View>
        </View>
      </View>
    );
  }
);
