import React, { forwardRef, RefObject, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
  ImageProps,
  ImageSourcePropType,
} from "react-native";

import Badge from "../badge";
import { normalize } from "../../functions/normalize";

export type AvatarProps = {
  source?: ImageSourcePropType;
  nameString?: string;
  onPress?: () => void;
  badge?: number;

  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  badgeStyle?: StyleProp<ViewStyle>;
  badgeTextStyle?: StyleProp<TextStyle>;
  imageProps?: ImageProps;
  letterStyle?: StyleProp<TextStyle>;
};

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

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#bdbdbd",
  },
  letter: {
    fontSize: normalize(30),
    fontWeight: "bold",
    color: "#ffffff",
  },
  badge: {
    position: "absolute",
    bottom: 2,
    right: -2,
  },
});

export default Avatar;
