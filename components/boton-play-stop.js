import React from "react";
import { StyleSheet, View, Button } from 'react-native';
export default function BtnPlayStop({btnInicio, activo, actionPlayStop}) {

    let titulo;
    if (activo){
        titulo = 'Pausar';
    } else {
        if (btnInicio) {
            titulo = 'Iniciar';
        } else {
            titulo = 'Reiniciar';
        }
        
    }

    return (
        <View style={styles.btn}>
            <Button  style={styles.btn}
            title={titulo}
            onPress={()=>{actionPlayStop(!activo)}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
      width: 100,
      borderWidth: 2,
      borderRadius: 6,
      marginRight: 5  
    },
  });
