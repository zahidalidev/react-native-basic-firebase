import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer"

import Retos from './app/views/Retos.js'
import Evolucion from './app/views/Evolucion.js'

const Stack = createDrawerNavigator();

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreAllLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Evolucion" drawerStyle={{
        backgroundColor: "white",
        width: 0
      }} >

        <Stack.Screen name="Evolucion">{(props) => <Evolucion {...props} />}</Stack.Screen>
        <Stack.Screen name="Retos">{(props) => <Retos {...props} />}</Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
