import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { vibrate } from './utils'
import Reloj from "./components/reloj.js";
import Display from "./components/display.js";
import Fondo from "./components/fondo.js";
import Botonera from "./components/botonera.js";
import Constants from 'expo-constants';


let intervalID = null;
const lapsoTrabajo = 3//25 * 60;
const lapsoDescanso = 3//5 * 60;
let contador = lapsoTrabajo;


export default function App() {

  const [activo, setActivo] = useState(false);
  const [trabajo, setTrabajo] = useState(true); //false es descanso
  const [countdown, setCountdown] = useState(contador);
  const [opacidad, setOpacidad] = useState(1);

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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
