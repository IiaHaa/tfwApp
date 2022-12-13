import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { ref, onValue } from 'firebase/database';
import database from './database';

export default function Profile() {
    const [workouts, setWorkouts] = useState([]);
    const [message, setMessage] = useState("");
    const list = [];

    // Realtime update
    useEffect(() => {
        const itemsRef = ref(database, 'workouts/');
        onValue(itemsRef, (snapshot) => {
          const data = snapshot.val();
          
          const allworkouts = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
          setWorkouts(allworkouts)
        })
    }, []);

    // Filtering records
    const maxList = {};
    const max = {}

    for (let i = 0; i < workouts.length; i++) {
        let item = workouts[i];
        
        if (item.weight == "") {
            if (maxList[item.workout] == undefined) {
                maxList[item.workout] = item.reps;
                max[item.workout] = item.reps + " toistoa";
            } else {
                if (maxList[item.workout] < item.reps) {
                    maxList[item.workout] = item.reps;
                    max[item.workout] = item.reps + " toistoa";
                }
            }
        } else if (item.reps == "1") {
            if (maxList[item.workout] == undefined) {
                maxList[item.workout] = item.weight;
                max[item.workout] = item.weight + " kg";
            } else {
                if (maxList[item.workout] < item.weight) {
                    maxList[item.workout] = item.weight;
                    max[item.workout] = item.weight + " kg";
                }
            }
        }
    };

    // Getting keys and values and adding them to list
    for (const [key, value] of Object.entries(max)) {
        list.push(`${key}: ${value}`);
    }

    useEffect(() => {
        if (list.length == 0) {
            setMessage("Ei vielä ennätyksiä");
        } else {
            list.sort();
            setMessage("");
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={{ marginBottom: 15 }}>
                    <FlatList 
                        renderItem={({item}) =>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <Icon type="material" name="star" iconStyle="sharp" color="#DE9E36" />
                                <ListItem.Title><Text style={{fontSize: 18}}> {item}</Text></ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        }
                        data={list}
                    />
                </View>
                <View style={styles.imagecontainer}>
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>
            <Image style={ styles.image } source={require('./trophy.png')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    main: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingLeft: '5%'
    },
    text: {
        fontSize: 15,
        marginBottom: 15
    },
    message: {
        fontSize: 18,
        marginTop: 30
    },
    imagecontainer: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        marginLeft: '55%'
    }
  });