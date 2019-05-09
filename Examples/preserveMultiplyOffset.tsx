import * as React from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { PinchGestureHandler } from "react-native-gesture-handler";
import { preserveMultiplicativeOffset } from "react-native-redash";

const { Value, event } = Animated;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const scale = new Value(1);
    const scaleState = new Value(0);

    this.handleZoom = event([
      {
        nativeEvent: {
          scale,
          state: scaleState,
        },
      },
    ]);

    this.scale = preserveMultiplicativeOffset(scale, scaleState);
  }

  render() {
    return (
      <View style={styles.container}>
        <PinchGestureHandler
          onGestureEvent={this.handleZoom}
          onHandlerStateChange={this.handleZoom}
        >
          <Animated.View
            style={[
              styles.box,
              {
                transform: [{ scale: this.scale }],
              },
            ]}
          />
        </PinchGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  box: {
    height: 40,
    width: 40,
    backgroundColor: "red",
  },
});
