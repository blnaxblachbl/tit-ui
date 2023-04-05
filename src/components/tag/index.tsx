import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {styles} from './styles';
import {TagProps} from './type';

const Tag = ({
  text = 'tag',
  textStyle,
  style,
  onPress = () => {},
  color,
  Left = null,
  Right = null,
  loading,
  loadingProps,
}: TagProps) => {
  const coloredContainer = useMemo(
    () => (color ? styles[color] : undefined),
    [color],
  );
  const coloredText = useMemo(
    () => (color ? styles[`${color}Text`] : undefined),
    [color],
  );

  const LoadingComponent = useMemo(() => {
    const _color = coloredText ? coloredText.color : '#1e1e1e';
    if (loading) {
      return (
        <View
          style={[
            {backgroundColor: '#fafafa'},
            coloredContainer,
            styles.loadingContainer,
          ]}>
          <ActivityIndicator size={'small'} color={_color} {...loadingProps} />
        </View>
      );
    }
    return null;
  }, [coloredText, coloredContainer, loading, loadingProps]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, coloredContainer, style]}>
        {Left}
        <Text style={[styles.text, coloredText, textStyle]}>{text}</Text>
        {Right}
        {LoadingComponent}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Tag;
