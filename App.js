import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { TextInput, Button, StyleSheet, View } from 'react-native';
import { vibrate } from './utils'
import Reloj from "./components/reloj.js";
import Display from "./components/display.js";
import Fondo from "./components/fondo.js";
import Botonera from "./components/botonera.js";
import Constants from 'expo-constants';


let intervalID = null;
const lapsoTrabajo = 10//25 * 60;
const lapsoDescanso = 10//5 * 60;
let contador = lapsoTrabajo;


export default function App() {

  const [activo, setActivo] = useState(false);
  const [trabajo, setTrabajo] = useState(true); //false es descanso
  const [countdown, setCountdown] = useState(contador);
  const [opacidad, setOpacidad] = useState(1);
  const [mostrarReloj, setMostrarReloj] = useState(false);

  useEffect(() => {
    if (activo) {
      if (contador === lapsoTrabajo || contador === lapsoDescanso) {
        setCountdown(--contador);
      }
      intervalID = setInterval(() => {
        setCountdown(--contador);
      }, 1000);
    } else {
      clearInterval(intervalID);
      intervalID = null;
      contador = contador;
      setCountdown(contador);
    }
  }, [activo]);

  useEffect(() => {
    setOpacidad(() => { return trabajo ? countdown / lapsoTrabajo : countdown / lapsoDescanso });
    if (countdown === 0) {
      vibrate();
    } else if (countdown === -1) {
      setTrabajo(!trabajo);
    }
  }, [countdown])

  useEffect(() => {
    if (trabajo) {
      contador = lapsoTrabajo;
    } else {
      contador = lapsoDescanso;
    }
    setCountdown(contador);
  }, [trabajo]);

  function reset() {
    contador = lapsoTrabajo;
    if (activo) {
      setActivo(false);
    } else {
      setCountdown(contador);
    }
    setTrabajo(true);
  }
  if (mostrarReloj){
    return (

      <View style={styles.container}>
      <Fondo opacidad={opacidad} trabajo={trabajo} />
      <Display trabajo={trabajo} opacidad={opacidad} />
      <Reloj sec={countdown} />
      <View style={{flexDirection:'row'}}>
        <TextInput editable={true} style={{width: 100,borderWidth: 2,
          borderRadius: 6, marginRight: 5,height:37, textAlign: 'center',
          justifyContent: 'center',}} placeholder='Descanso' placeholderTextColor='#000000'
          />
        <TextInput style={{width: 100,borderWidth: 2,
          borderRadius: 6, marginLeft: 5,height:37, textAlign: 'center',
          justifyContent: 'center',}} placeholder={`Descanso: ${lapsoDescanso}`} placeholderTextColor='#000000'
          />
      </View>
      <View style={styles.btn}>
        <Button onPress={()=> {setMostrarReloj(!mostrarReloj)}} title='Volver'/>
      </View>
      <StatusBar style="auto" />
    </View>
    );
  }
  return (

    <View style={styles.container}>
      <Fondo opacidad={opacidad} trabajo={trabajo} />
      <Display trabajo={trabajo} opacidad={opacidad} />
      <Reloj sec={countdown} />
      <Botonera
        activo={activo}
        btnPlayEstado={(trabajo && countdown === lapsoTrabajo) || (!trabajo && countdown === lapsoDescanso)}
        actionPlayStop={setActivo}
        btnResetDisabled={!activo && (trabajo && countdown === lapsoTrabajo)}
        actionReset={reset}
      />
      <View style={styles.btn}>
        <Button onPress={()=> {setMostrarReloj(!mostrarReloj)}} title='Configuración'/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 210,
    borderWidth: 2,
    borderRadius: 6,
    marginTop: 2,
    backgroundColor: '#000000',
  },
});
