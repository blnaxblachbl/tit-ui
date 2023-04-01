import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
  ReactElement,
} from "react";
import {
  Animated,
  View,
  PanResponder,
  ViewProps,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
} from "react-native";

import { styles } from "./styles";

export interface SliderProps extends ViewProps {
  minValue?: number;
  maxValue?: number;
  trackStyle?: StyleProp<ViewStyle>;
  circleStyle?: StyleProp<ViewStyle>;
  circleSize?: number;
  circleIsScale?: boolean;
  circleMaxScale?: number;
  onValueChange?: (value: number) => void;
  CustomCircle?: ReactElement;
}

export type SliderSetValueOpotion = {
  animated?: boolean;
};

export type SliderHandler = {
  value: number;
  setValue?: (value: number, options?: SliderSetValueOpotion) => void;
  containerRef: View | null;
};

const Slider = forwardRef<SliderHandler, SliderProps>(
  (
    {
      style,
      trackStyle,
      circleStyle,
      circleSize = 30,
      minValue = 0,
      maxValue = 100,
      circleIsScale = true,
      circleMaxScale = 1.3,
      onValueChange = (value: number) => {},
      CustomCircle = null,
    },
    ref
  ) => {
    const scale = useRef(new Animated.Value(1)).current;
    const pan = useRef(new Animated.Value(0)).current;
    const lastValue = useRef<number>(minValue);
    const containerRef = useRef<View>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const offset = useMemo(() => circleSize / 2, [circleSize]);
    const step = useMemo(
      () => containerWidth / (maxValue - minValue),
      [containerWidth, maxValue, minValue]
    );

    useEffect(() => {
      return () => {
        pan.removeAllListeners();
      };
    }, []);

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

    const onContainerLayout = (e: LayoutChangeEvent) => {
      if (!containerWidth) {
        setContainerWidth(e.nativeEvent.layout.width);
      }
    };

    const setValue = (value: number, options?: SliderSetValueOpotion) => {
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
    };

    useImperativeHandle(ref, () => ({
      value: lastValue.current,
      containerRef: containerRef.current,
      setValue: setValue,
    }));

    const translateX = pan.interpolate({
      inputRange: [0, containerWidth],
      outputRange: [-offset, containerWidth - offset],
      extrapolate: "clamp",
    });

    translateX.addListener(({ value }) => {
      const newValue = Math.floor((value + offset) / step) + minValue;
      if (lastValue.current !== newValue) {
        onValueChange(newValue);
        lastValue.current = newValue;
      }
    });

    const RenderCircle = useMemo(() => {
      if (CustomCircle) return CustomCircle;
      return (
        <View
          style={[
            styles.circle,
            circleStyle,
            {
              width: circleSize,
              height: circleSize,
            },
          ]}
        />
      );
    }, [CustomCircle, circleSize, circleStyle]);

    return (
      <View
        onLayout={onContainerLayout}
        ref={containerRef}
        style={[styles.container, style]}
      >
        <View style={[styles.track, trackStyle]} />
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
    );
  }
);

export default Slider;
