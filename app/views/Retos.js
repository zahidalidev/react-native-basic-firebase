import React from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, StatusBar, TextInput, Dimensions, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { RFValue } from "react-native-responsive-fontsize"
import firebase from "firebase"
import "firebase/firestore"

import { Colors } from "../config/colors";
import { firebaseConfig } from "../config/db"

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore()

const height = Dimensions.get('window').height;

export default class Evolucion extends React.Component {

  state = {
    indicator: false,
    nombre: '',
    detalle: '',
    categoria: '',
    tiempo: '',
    periodicidad: '',
    completado: ''
  }

  retosRef = firestore.collection('Retos')
  submit = async () => {
    const { nombre, detalle, categoria, tiempo, periodicidad, completado } = this.state;
    if (!(nombre && detalle && categoria && tiempo && periodicidad && completado)) {
      alert("Uno o mas campos falta por rellenar")
      return;
    }
    const body = {
      nombre, detalle, categoria, tiempo, periodicidad, completado
    }

    try {
      this.setState({ indicator: true })
      await this.retosRef.add(body);
      alert("Completado")
    } catch (error) {
      alert(error)
    }
    this.setState({ indicator: false })
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%" }} >

          {/* App Bar */}
          <View style={{ paddingLeft: RFValue(20, height), paddingRight: RFValue(20, height), justifyContent: "space-between", alignItems: "center", flexDirection: "row", position: "absolute", top: 0, left: 0, right: 0, height: RFValue(65, height), backgroundColor: Colors.primary }} >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Evolucion')} >
              <MaterialCommunityIcons name="arrow-left" size={RFValue(25, height)} color={Colors.white} />
            </TouchableOpacity>
            <Text style={{ color: Colors.white, fontSize: RFValue(25, height), marginRight: RFValue(100, height) }} >Nuevo Reto</Text>
            <TouchableOpacity style={{ backgroundColor: Colors.blueLight }} >
              <Text style={{ padding: RFValue(10, height), color: Colors.white, fontSize: RFValue(20, height) }} >INICIO</Text>
            </TouchableOpacity>
          </View>

          {this.state.indicator ?
            <View style={{ justifyContent: "center", alignItems: "center" }} >
              <ActivityIndicator color={Colors.primary} size={RFValue(50, height)} />
            </View> :

            <ScrollView style={{ width: "100%", marginTop: RFValue(100, height) }} >
              <View style={{ width: "100%", marginBottom: RFValue(20, height), alignItems: "center", flex: 1 }} >
                <View style={{ width: "80%", alignItems: "flex-start" }} >
                  <Text style={{ fontSize: RFValue(30, height), fontWeight: "bold" }} >Nuevo Reto</Text>
                </View>

                <View style={{ marginTop: RFValue(20, height), flexDirection: "column", width: "80%", borderBottomColor: Colors.grey, borderBottomWidth: 1 }} >
                  <Text style={{ fontSize: RFValue(19, height) }} >nombre</Text>
                  <TextInput
                    style={{ padding: RFValue(7, height), fontSize: RFValue(21, height) }}
                    placeholder="Escribe tu nuevo reto"
                    onChangeText={(value) => this.setState({ nombre: value })}
                  />
                </View>

                <View style={{ marginTop: RFValue(15, height), flexDirection: "column", width: "80%", borderBottomColor: Colors.grey, borderBottomWidth: 1 }} >
                  <Text style={{ fontSize: RFValue(19, height) }} >detalle</Text>
                  <TextInput
                    style={{ padding: RFValue(7, height), fontSize: RFValue(21, height) }}
                    placeholder="Describe tu reto"
                    onChangeText={(value) => this.setState({ detalle: value })}
                  />
                </View>

                <View style={{ marginTop: RFValue(15, height), flexDirection: "column", width: "80%", borderBottomColor: Colors.grey, borderBottomWidth: 1 }} >
                  <Text style={{ fontSize: RFValue(19, height) }} >categoria</Text>
                  <TextInput
                    style={{ padding: RFValue(7, height), fontSize: RFValue(21, height) }}
                    placeholder="Cual es la categoria"
                    onChangeText={(value) => this.setState({ categoria: value })}
                  />
                </View>

                <View style={{ marginTop: RFValue(15, height), flexDirection: "column", width: "80%", borderBottomColor: Colors.grey, borderBottomWidth: 1 }} >
                  <Text style={{ fontSize: RFValue(19, height) }} >tiempo</Text>
                  <TextInput
                    style={{ padding: RFValue(7, height), fontSize: RFValue(21, height) }}
                    placeholder="Tiempo en dias que dura el reto"
                    onChangeText={(value) => this.setState({ tiempo: value })}
                  />
                </View>

                <View style={{ marginTop: RFValue(15, height), flexDirection: "column", width: "80%", borderBottomColor: Colors.grey, borderBottomWidth: 1 }} >
                  <Text style={{ fontSize: RFValue(19, height) }} >periodicidad</Text>
                  <TextInput
                    style={{ padding: RFValue(7, height), fontSize: RFValue(21, height) }}
                    placeholder="Cada cuanto avisa en dias"
                    onChangeText={(value) => this.setState({ periodicidad: value })}
                  />
                </View>

                <View style={{ marginTop: RFValue(15, height), flexDirection: "column", width: "80%", borderBottomColor: Colors.grey, borderBottomWidth: 1 }} >
                  <Text style={{ fontSize: RFValue(19, height) }} >completado</Text>
                  <TextInput
                    style={{ padding: RFValue(7, height), fontSize: RFValue(21, height) }}
                    placeholder="Completado"
                    onChangeText={(value) => this.setState({ completado: value })}
                  />
                </View>

                <View style={{ marginTop: RFValue(20, height), flexDirection: "row", width: "80%" }} >
                  <TouchableOpacity onPress={() => this.submit()} style={{ paddingLeft: RFValue(15, height), paddingRight: RFValue(15, height), elevation: 7, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: Colors.blueLight, borderRadius: RFValue(30, height) }} >
                    <MaterialCommunityIcons name="content-save" size={RFValue(20, height)} color={Colors.white} />
                    <Text style={{ padding: RFValue(12, height), color: Colors.white, fontSize: RFValue(20, height) }} >GUARDAR</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </ScrollView>
          }

        </View>
      </>
    )
  }
}
