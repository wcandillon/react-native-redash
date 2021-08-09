import * as React from "react";
import type { TextStyle, StyleProp } from "react-native";
import { TextInput } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface TextProps {
  text: Animated.Node<string>;
  style?: StyleProp<Animated.AnimateStyle<TextStyle>>;
}

const ReText = (props: TextProps) => {
  const { text, style } = { style: {}, ...props };
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      {...{ text, style }}
    />
  );
};

export default ReText;
