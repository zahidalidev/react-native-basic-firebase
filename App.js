import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer"

import Evolucion from './app/views/Evolucion.js'
import Retos from './app/views/Retos.js'

const Stack = createDrawerNavigator();

export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Retos" drawerStyle={{
        backgroundColor: "white",
        width: 0
      }} >

        <Stack.Screen name="Retos">{(props) => <Retos {...props} />}</Stack.Screen>
        <Stack.Screen name="Evolucion">{(props) => <Evolucion {...props} />}</Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
