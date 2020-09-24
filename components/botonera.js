import React from "react";
import { StyleSheet, View } from 'react-native';
import BtnPlayStop from "./boton-play-stop.js";
import BtnReset from "./boton-reset.js";
export default function Botonera({activo, btnPlayEstado, actionPlayStop, btnResetDisabled, actionReset}) {

    return (
        <View style={styles.fixToText}>
        <BtnPlayStop 
          btnPlayEstado = {btnPlayEstado}
          activo = {activo}
          actionPlayStop = {actionPlayStop}
        />
        <BtnReset
          btnResetDisabled = {btnResetDisabled}
          activo = {activo}
          actionReset = {actionReset} />
      </View>
    );
}

const styles = StyleSheet.create({
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

