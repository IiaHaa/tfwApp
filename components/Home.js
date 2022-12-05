import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import { ref, onValue } from 'firebase/database';
import database from './database';

export default function Home() {
    const [workouts, setWorkouts] = useState([]);
    // Realtime update
    useEffect(() => {
        const itemsRef = ref(database, 'workouts/');
        onValue(itemsRef, (snapshot) => {
          const data = snapshot.val();
          
          const allworkouts = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
          setWorkouts(allworkouts)
        })
    }, []);

    const [date, setDate] = useState('Etsitään päivämäärää...');
    const [liike, setLiike] = useState('Etsitään liikkeitä...');

    useEffect(() => {
        const kuukaudet = ['Kuukauden', 'Tammikuun', 'Helmikuun', 'Maaliskuun', 'Huhtikuun', 'Toukokuun', 'Kesäkuun', 'Heinäkuun', 'Elokuun', 'Syyskuun', 'Lokakuun', 'Marraskuun', 'Joulukuun']
        const liikkeet = ['Pääliikkeet', 'OH Press & Deadlift', 'Bench Press & Back Squat', 'Pull-up & Front Squat', 'OH Press & Deadlift', 'Bench Press & Back Squat', 'Pull-up & Front Squat', '', 'Bench Press & Back Squat', 'Pull-up & Front Squat', 'OH Press & Deadlift', 'Bench Press & Back Squat', 'Pull-up & Front Squat']
        let month = new Date().getMonth() +1;
        let date = kuukaudet[ month ]
        let liike = liikkeet[ month ]
        setDate(date);
        setLiike(liike);
    });

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Image style={ styles.image } source={require('./tfw_logo.png')}/>
                <View style={styles.textcontainer}>
                    <Text style={styles.title}>Tervetuloa TFW Appiin!</Text>

                    <Text style={styles.text}>
                    {date} pääliikkeet: {'\n\n'}
                    {liike}
                    </Text>

                    <Text style={styles.p2}>
                        Kirjattuja treenejä yhteensä: {workouts.length}
                    </Text>
                </View>
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
      paddingTop: '5%'
    },
    textcontainer: {
        paddingLeft: '10%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: '15%',
        marginBottom: 20
    },
    text: {
        fontSize: 18
    },
    p2: {
        paddingTop: 20
    },
    image: {
        width: 300,
        height: 132,
        marginLeft: '5%',
        resizeMode: 'stretch',
        justifyContent: 'center'
    }
  });