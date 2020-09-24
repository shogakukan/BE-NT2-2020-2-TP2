import React from "react";
import { StyleSheet, Text, View } from 'react-native';
export default function Display({trabajo, opacidad}) {

    return (
    <View>
        <Text style={styles.displayTxt}>
            {trabajo ? "Trabajo" : "Descanso"}
        </Text>
    </View>
    );
}

const styles = StyleSheet.create({
    displayTxt: {
        fontFamily: 'Helvetica',
        fontSize: 60,
        textAlign: "center"
    },
  });




