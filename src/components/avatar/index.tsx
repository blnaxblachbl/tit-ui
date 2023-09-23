import React, { forwardRef, useCallback, useMemo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { Badge } from "../badge";

import { styles } from "./styles";
import { AvatarProps } from "./types";

export * from "./types";

export const Avatar = forwardRef<TouchableOpacity, AvatarProps>(
  (
    {
      source,
      nameString = "",
      onPress = () => {},
      badge = 0,
      style,
      imageStyle,
      badgeStyle,
      badgeTextStyle,
      imageProps,
      letterStyle,
      themes = {},
      theme,
    },
    ref
  ) => {
    const _theme = useMemo(() => themes[theme], [theme, themes]);

    const renderImage = useCallback(() => {
      let letters = ["N", "A"];
      if (source) {
        return (
          <Image
            source={source}
            resizeMode="cover"
            style={[styles.image, _theme?.imageStyle, imageStyle]}
            {...imageProps}
          />
        );
      }
      if (nameString) {
        letters = nameString
          .split(" ")
          .map((item) => item.slice(0, 1).toUpperCase());
      }
      return (
        <View style={[styles.image, _theme?.imageStyle, imageStyle]}>
          {letters.map((item, index) =>
            index < 2 ? (
              <Text
                key={item + index}
                style={[styles.letter, _theme?.letterStyle, letterStyle]}
              >
                {item}
              </Text>
            ) : null
          )}
        </View>
      );
    }, [nameString, source, imageStyle, letterStyle, _theme]);

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        activeOpacity={1}
        style={[styles.container, _theme?.style, style]}
      >
        {renderImage()}
        <Badge
          style={[styles.badge, _theme?.badgeStyle, badgeStyle]}
          textStyle={[badgeTextStyle, _theme?.badgeTextStyle]}
          badge={badge}
        />
      </TouchableOpacity>
    );
  }
);
