import React, { forwardRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import Badge from "../badge";

import { styles } from "./styles";
import { AvatarProps } from "./types";

const Avatar = forwardRef<TouchableOpacity, AvatarProps>(
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
    },
    ref
  ) => {
    const renderImage = useCallback(() => {
      let letters = ["N", "A"];
      if (source) {
        return (
          <Image
            source={source}
            resizeMode="cover"
            style={[styles.image, imageStyle]}
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
        <View style={[styles.image, imageStyle]}>
          {letters.map((item, index) =>
            index < 2 ? (
              <Text key={item + index} style={[styles.letter, letterStyle]}>
                {item}
              </Text>
            ) : null
          )}
        </View>
      );
    }, [nameString, source, imageStyle, letterStyle]);

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        activeOpacity={1}
        style={[styles.container, style]}
      >
        {renderImage()}
        <Badge
          style={[styles.badge, badgeStyle]}
          textStyle={badgeTextStyle}
          badge={badge}
        />
      </TouchableOpacity>
    );
  }
);

export default Avatar;
