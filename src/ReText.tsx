import * as React from "react";
import { TextInput, TextStyle } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface TextProps {
  text: Animated.Node<string>;
  style?: TextStyle;
  textColor?: string;
}

export default (props: TextProps) => {
  const { text, style, textColor } = { style: {}, ...props };
  const ref = React.useRef();

  const _setText = (placeholder: any) => {
    if (typeof placeholder === "number") {
      placeholder = Math.round(placeholder).toString();
    }
    ref.current.setNativeProps({
      placeholder
    })
  }

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      placeholderTextColor={textColor}
      editable={false}
      {...{ ref, style }}
    >
      <Animated.Code>
        {Animated.call([text], ([text]) => _setText(text))}
      </Animated.Code>
    </AnimatedTextInput>
  );
};
