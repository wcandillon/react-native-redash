import * as React from "react";
import { TextInput, TextStyle } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface TextProps {
  text: Animated.Node<string>;
  style?: TextStyle;
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
