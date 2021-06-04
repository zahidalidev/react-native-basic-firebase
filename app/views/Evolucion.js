import React from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, FlatList, Dimensions, StatusBar } from 'react-native';
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
        this.setState({ sitios: [...this.state.sitios, ...retos], loading: false });
      })
    } catch (error) {
      alert(error)
    }
    this.setState({ loading: false });
  }


  render() {
    if (this.state.loading) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }} >
          <ActivityIndicator color={Colors.primary} size={RFValue(50, height)} />
        </View>
      )
    }

    return (
      <>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%" }} >
          {/* App Bar */}
          <View style={{ paddingLeft: RFValue(20, height), paddingRight: RFValue(20, height), justifyContent: "space-between", alignItems: "center", flexDirection: "row", position: "absolute", top: 0, left: 0, right: 0, height: RFValue(65, height), backgroundColor: Colors.primary }} >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Retos')} >
              <MaterialCommunityIcons name="arrow-left" size={RFValue(25, height)} color={Colors.white} />
            </TouchableOpacity>
            <Text style={{ color: Colors.white, fontSize: RFValue(25, height), marginRight: RFValue(100, height) }} >Evolucion</Text>
            <TouchableOpacity style={{ backgroundColor: Colors.secondary }} >
              <Text style={{ padding: RFValue(10, height), color: Colors.white, fontSize: RFValue(20, height) }} >INICIO</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={{
              flex: 1, marginTop: RFValue(70, height)
            }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.sitios}
            renderItem={({ item, index }) => <Card data={item} />}
          />

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Retos')} style={{ backgroundColor: Colors.primary, width: "100%", justifyContent: "center", alignItems: "center" }} >
            <Text style={{ padding: RFValue(23, height), color: Colors.white, fontSize: RFValue(20, height) }} >Nuevo Reto</Text>
          </TouchableOpacity>
        </View >
      </>
    )
  }
}
