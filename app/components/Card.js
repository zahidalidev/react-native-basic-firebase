import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Colors } from '../config/colors';
import { RFValue } from "react-native-responsive-fontsize"

const height = Dimensions.get("window").height;

function Card({ data }) {
    return (
        <View key={data.id} style={{ borderBottomColor: "grey", borderBottomWidth: 0.4, justifyContent: "center", flexDirection: "column", width: "100%", padding: RFValue(20, height) }} >
            <Text numberOfLines={1} style={{ color: Colors.black, fontSize: RFValue(23, height) }} >{data.nombre}</Text>

            <View style={{ alignItems: "flex-start", justifyContent: "space-between", width: "100%", flexDirection: "row" }} >
                <Text numberOfLines={3} style={{ color: Colors.grey, fontSize: RFValue(19, height), width: "70%" }} >{data.detalle}</Text>

                <View style={{ marginRight: "20%", backgroundColor: Colors.secondary, padding: RFValue(8, height), borderRadius: RFValue(50, height), paddingLeft: RFValue(15, height), paddingRight: RFValue(15, height) }} >
                    <Text style={{ color: Colors.white, fontSize: RFValue(16, height) }} >{data.completado}</Text>
                </View>
            </View>
        </View>
    );
}

export default Card;