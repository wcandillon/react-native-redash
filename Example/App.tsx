import * as React from 'react'
import { NavigationNativeContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'

import Home from './src/Home'
import { withOffset, withDecay, withSpring, preserveMultiplicativeOffset, PanGestureHelpers } from './src/Gestures'

enableScreens();

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="withOffset" component={withOffset} />
        <Stack.Screen name="withDecay" component={withDecay} />
        <Stack.Screen name="withSpring" component={withSpring} />
        <Stack.Screen name="preserveMultiplicativeOffset" component={preserveMultiplicativeOffset} />
        <Stack.Screen name="PanGestureHelpers" component={PanGestureHelpers} />

      </Stack.Navigator>
    </NavigationNativeContainer>
  )
}

export default App
