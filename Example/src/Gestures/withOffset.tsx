import React, { useRef } from 'react'
import { View, Text } from 'react-native'
import { withOffset } from 'react-native-redash'
import { PanGestureHandler, State as GestureState } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { useMemoOne } from 'use-memo-one'

import Box from './Box'

const { Value, event } = Animated

const withOffsetExample = () => {
  const { dragX, dragY, panState, translateY, translateX } = useMemoOne(() => {
    const dragX = new Value(0)
    const dragY = new Value(0)
    const panState = new Value(GestureState.UNDETERMINED)

    return {
      dragX,
      dragY,
      panState,
      translateX: withOffset(dragX, panState),
      translateY: withOffset(dragY, panState)
    }
  }, [])

  const onGestureEvent = useRef(event([({
    nativeEvent: {
      translationX: dragX,
      translationY: dragY,
      state: panState,
    }
  })]))

  return (
    <View>
      <Text>withOffset</Text>

      <PanGestureHandler onGestureEvent={onGestureEvent.current} onHandlerStateChange={onGestureEvent.current}>
        <Animated.View style={{
          transform: [{ translateX }, { translateY }]
        }}>
          <Box />
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

export default withOffsetExample
