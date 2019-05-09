import * as React from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { limit } from "react-native-redash";

const { Value, event } = Animated;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.X = new Value(0);
    this.Y = new Value(0);
    const dragX = new Value(0);
    const dragY = new Value(0);
    const panState = new Value(0);

    this.handlePan = event([
      {
        nativeEvent: {
          translationX: dragX,
          translationY: dragY,
          state: panState,
        },
      },
    ]);

    this.X = limit(dragX, panState, -100, 100);
    this.Y = limit(dragY, panState, -100, 100);
  }

  render() {
    return (
      <View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={this.handlePan}
          onHandlerStateChange={this.handlePan}
        >
          <Animated.View
            style={[
              styles.box,
              {
                transform: [{ translateX: this.X }, { translateY: this.Y }],
              },
            ]}
          />
        </PanGestureHandler>
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
