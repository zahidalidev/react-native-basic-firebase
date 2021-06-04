import React from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../config/colors';

function Card({ data }) {
    return (
        <View style={{ borderBottomColor: "grey", borderBottomWidth: 0.4, justifyContent: "center", flexDirection: "column", width: "100%", padding: 20 }} >
            <Text numberOfLines={1} style={{ color: Colors.black, fontSize: 28 }} >{data.nombre}</Text>

            <View style={{ alignItems: "center", justifyContent: "space-between", width: "100%", flexDirection: "row" }} >
                <Text numberOfLines={3} style={{ color: Colors.grey, fontSize: 20, width: "70%" }} >{data.detalle}</Text>

                <View style={{ marginRight: "10%", backgroundColor: Colors.secondary, padding: 8, borderRadius: 50, paddingLeft: 15, paddingRight: 15 }} >
                    <Text style={{ color: Colors.white, fontSize: 20 }} >{data.completado}</Text>
                </View>
            </View>
        </View>
    );
}

export default Card;