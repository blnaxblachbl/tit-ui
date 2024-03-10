import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { styles } from "./styles";
import { TagProps } from "./types";
import { usePropsToStyle } from "../../hooks/usePropsToStyle";

export * from "./types";

export const Tag = ({
  text = "tag",
  textStyle,
  style,
  onPress = () => {},
  color,
  Left = null,
  Right = null,
  loading,
  loadingProps,
  ...props
}: TagProps) => {
  const { viewStyles, textStyles } = usePropsToStyle(props);

  const coloredContainer = useMemo(() => styles[color], [color]);
  const coloredText = useMemo(() => styles[`${color}Text`], [color]);

  const LoadingComponent = useMemo(() => {
    const color = coloredText ? coloredText.color : "#1e1e1e";
    if (loading) {
      return (
        <View style={[styles.loadingContainer, coloredContainer]}>
          <ActivityIndicator size={"small"} color={color} {...loadingProps} />
        </View>
      );
    }
    return null;
  }, [coloredText, coloredContainer, loading, loadingProps]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, coloredContainer, style, viewStyles]}>
        {Left}
        <Text style={[styles.text, coloredText, textStyle, textStyles]}>
          {text}
        </Text>
        {Right}
        {LoadingComponent}
      </View>
    </TouchableWithoutFeedback>
  );
};
