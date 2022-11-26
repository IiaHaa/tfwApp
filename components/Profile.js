import React from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function Profile() {
    return (
        <View style={styles.container}>
            <Text>Profiili</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      paddingLeft: '10%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: '10%',
        marginBottom: 10
    }
  });