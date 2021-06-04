import React from 'react';
import { View, StyleSheet, Image, Alert, TouchableOpacity, Text, Button, FlatList, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Constants from 'expo-constants';
import firebase from "firebase"
import "firebase/firestore"
import { RFValue } from "react-native-responsive-fontsize"
import { Colors } from "../config/colors";

import { firebaseConfig } from "../config/db"
import Card from '../components/Card';


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();

const height = Dimensions.get("window").height;

export default class Retos extends React.Component {

  state = {
    sitios: [],
    loading: true
  }

  retosRef = firestore.collection('Retos')

  componentDidMount = async () => {
    try {
      await this.retosRef.onSnapshot((querySnapshot) => {
        const retos = querySnapshot.docChanges().map(({ doc }) => {
          const reto = doc.data();
          return reto;
        })
        // console.log(retos)
        this.setState({ sitios: retos, loading: false });
      })
    } catch (error) {

    }
  }


  render() {

    if (this.state.loading) {
      return (
        <View>
          <Text>Cargando </Text>
        </View>
      )
    }

    return (
      <View style={{ marginTop: Constants.statusBarHeight, flex: 1, alignItems: "center", justifyContent: "center", width: "100%" }} >

        {/* App Bar */}
        <View style={{ paddingLeft: 20, paddingRight: 20, justifyContent: "space-between", alignItems: "center", flexDirection: "row", position: "absolute", top: 0, left: 0, right: 0, height: 65, backgroundColor: Colors.primary }} >
          <TouchableOpacity>
            <MaterialCommunityIcons name="arrow-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={{ color: Colors.white, fontSize: 25, marginRight: 100 }} >Evolucion</Text>
          <TouchableOpacity style={{ backgroundColor: Colors.secondary }} >
            <Text style={{ padding: 10, color: Colors.white, fontSize: 20 }} >INICIO</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{
            flex: 1, marginTop: RFValue(70, height)
          }}
          keyExtractor={(item, index) => item.id}
          data={this.state.sitios}
          renderItem={({ item, index }) => <Card data={item} />}
        />

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Evolucion')} style={{ backgroundColor: Colors.primary, width: "100%", justifyContent: "center", alignItems: "center" }} >
          <Text style={{ padding: 23, color: Colors.white, fontSize: 20 }} >NUEVOTO</Text>
        </TouchableOpacity>
      </View >
    )

  }
}
