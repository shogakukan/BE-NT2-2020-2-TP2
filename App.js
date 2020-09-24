import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {vibrate} from './utils'
import Reloj from "./components/reloj.js";
import Display from "./components/display.js";
import Fondo from "./components/fondo.js";
import BtnPlayStop from "./components/boton-play-stop.js";
import BtnReset from "./components/boton-reset.js";
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
    if (activo){
      if (contador === lapsoTrabajo || contador === lapsoDescanso) {
        setCountdown(--contador);
      }
      intervalID = setInterval(() => {
            setCountdown(--contador);
      }, 1000);
    } else {
      detenerContador(contador);
    }
  }, [activo]);

  useEffect(()=>{
    if (trabajo){
      setOpacidad(countdown / lapsoTrabajo);
    } else {
      setOpacidad(countdown / lapsoDescanso);
    }    
    if (countdown === 0){
      vibrate();  
    } else if (countdown === -1){
      setTrabajo(!trabajo);
    }
  }, [countdown])

  useEffect(() => {
    if (trabajo){
      contador = lapsoTrabajo;
    } else {
      contador = lapsoDescanso;
    }
    setCountdown(contador);
  }, [trabajo]);

  function detenerContador (sec){
    clearInterval(intervalID);
    intervalID=null;
    contador = sec;
    setCountdown(contador);
  }

  function reset(){
    contador = lapsoTrabajo;
    if (activo){
      setActivo(false);
    } else {
      detenerContador(contador);
    }
    setTrabajo(true);
  }

  return (
    
    <View style={styles.container}>
      <Fondo opacidad={opacidad} trabajo={trabajo} />
      <Display trabajo={trabajo} opacidad={opacidad} />
      <Reloj sec = {countdown} />
      <View style={styles.fixToText}>
        <BtnPlayStop 
          btnInicio = {(trabajo && countdown === lapsoTrabajo) || (!trabajo && countdown === lapsoDescanso)}
          activo = {activo}
          actionPlayStop = {setActivo}
        />
        <BtnReset
          btnDisabled = {!activo && (trabajo && countdown === lapsoTrabajo)}
          activo = {activo}
          actionReset = {reset} />
      </View>
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
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
