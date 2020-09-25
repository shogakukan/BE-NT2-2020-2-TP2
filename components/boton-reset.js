import React from "react";
import { StyleSheet, View, Button } from 'react-native';
export default function BtnReset({btnResetDisabled, actionReset}) {

    return (
        <View style={styles.btn}>
            <Button 
            title='Reset'
            onPress={()=>{actionReset()}}
            disabled = {btnResetDisabled}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    btn: {
      width: 100,
      borderWidth: 2,
      borderRadius: 6,
      marginLeft: 5,
      backgroundColor: '#000000',
    },
  });