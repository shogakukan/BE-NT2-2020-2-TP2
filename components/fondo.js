import React from "react";
import { StyleSheet, View, Button } from 'react-native';
export default function Fondo({opacidad, trabajo}) {

    return (
        <View style={{position: 'absolute', zIndex: -1, opacity: opacidad, width:300, height:300,
        backgroundColor: trabajo ? "#dc143c" : "#8fbc8f"}} />
    );
}