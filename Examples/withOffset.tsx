import * as React from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { withOffset } from "react-native-redash";

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
          state: panState
        }
      }
    ]);

    this.X = withOffset(dragX, panState);
    this.Y = withOffset(dragY, panState);
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
                transform: [{ translateX: this.X }, { translateY: this.Y }]
              }
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  box: {
    width: 40,
    height: 40,
    backgroundColor: "red"
  }
});
