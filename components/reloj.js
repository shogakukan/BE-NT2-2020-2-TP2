
import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function Display({sec}) {
    

    let segundos = dobleDigito(sec % 60);
    let minutos = dobleDigito(Math.trunc(sec / 60));

    function dobleDigito (numero) {
        if (numero === -1) {
            return "00";
        } else if (numero < 10){
            return "0" + numero;
        } else {
            return numero;
        }
    }

    return (
    <View>
        <Text style={styles.displayTxt}>{minutos}:{segundos}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    displayTxt: {
        fontFamily: 'Helvetica',
        fontSize: 40,
        textAlign: "center"
    },
  });




