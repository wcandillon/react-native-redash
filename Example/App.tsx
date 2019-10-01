import * as React from 'react'
import { NavigationNativeContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Gestures from './src/Gestures'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <NavigationNativeContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Gestures" component={Gestures} />
        {/* <Drawer.Screen name="Article" component={Article} /> */}
      </Drawer.Navigator>
    </NavigationNativeContainer>
  )
}

export default App
