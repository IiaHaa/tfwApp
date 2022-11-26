import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, Image} from 'react-native';

export default function Home() {
    const [date, setDate] = useState('Etsitään päivämäärää...');

    useEffect(() => {
        const kuukaudet = ['Kuukauden', 'Tammikuun', 'Helmikuun', 'Maaliskuun', 'Huhtikuun', 'Toukokuun', 'Kesäkuun', 'Heinäkuun', 'Elokuun', 'Syyskuun', 'Lokakuun', 'Marraskuun', 'Joulukuun']
        let month = new Date().getMonth() +1;
        let date = kuukaudet[ month ]
        setDate(date);
    });

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
            <Image style={ styles.image } source={require('./tfw_logo.png')}/>
                <Text style={styles.title}>Tervetuloa TFW Appiin!</Text>

                <Text style={styles.text}>
                {date} pääliikkeet: {'\n\n'}
                Bench Press{'\n'}
                Back Squat
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text>
                    Lisää tekstiä
                </Text>
            </View>
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
        marginBottom: 20
    },
    text: {
        fontSize: 18
    },
    image: {
        width: 300,
        height: 132,
        resizeMode: 'stretch'
    }
  });