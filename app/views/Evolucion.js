import React from 'react';
import { View, StyleSheet, Image, Alert, TouchableOpacity, Text, Button } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Constants from 'expo-constants';
import firebase from "firebase"
import "firebase/firestore"
import { RFValue } from "react-native-responsive-fontsize"
import { Colors } from "../config/colors";

import { firebaseConfig } from "../config/db"
import Card from '../components/Card';


export default class Evolucion extends React.Component {

  render() {
    return (
      <View style={{ marginTop: Constants.statusBarHeight, flex: 1, alignItems: "center", justifyContent: "center", width: "100%" }} >

        {/* App Bar */}
        <View style={{ paddingLeft: 20, paddingRight: 20, justifyContent: "space-between", alignItems: "center", flexDirection: "row", position: "absolute", top: 0, left: 0, right: 0, height: 65, backgroundColor: Colors.primary }} >
          <TouchableOpacity>
            <MaterialCommunityIcons name="arrow-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={{ color: Colors.white, fontSize: 25, marginRight: 100 }} >Nuevo Reto</Text>
          <TouchableOpacity style={{ backgroundColor: Colors.blueLight }} >
            <Text style={{ padding: 10, color: Colors.white, fontSize: 20 }} >INICIO</Text>
          </TouchableOpacity>
        </View>


      </View>
    )
  }
}
