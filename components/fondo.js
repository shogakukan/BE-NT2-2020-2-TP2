import React from "react";
import { Dimensions, View, Button } from 'react-native';
export default function Fondo({opacidad, trabajo}) {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <View style={{position: 'absolute', zIndex: -1, opacity: opacidad, width:windowWidth, height:windowHeight,
        backgroundColor: trabajo ? "#dc143c" : "#8fbc8f"}}>
        </View>
    );
}