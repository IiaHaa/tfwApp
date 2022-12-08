import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
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

    // Records
    const maxList = {};

    for (let i = 0; i < workouts.length; i++) {
        let item = workouts[i];
        
        if (item.weight == "") {
            if (maxList[item.workout] == undefined) {
                maxList[item.workout] = item.reps;
            } else {
                if (maxList[item.workout].reps < item.reps) {
                    maxList[item.workout].reps = item.reps;
                }
            }
        } else {
            if (maxList[item.workout] == undefined) {
                maxList[item.workout] = item.weight;
            }
        }
    };

    console.log(maxList);

    for (const [key, value] of Object.entries(maxList)) {
        list.push(`${key}: ${value}`);
    }

    useEffect(() => {
        if (list.length == 0) {
            setMessage("Ei vielä ennätyksiä");
        } else {
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
                                <ListItem.Title><Text style={{fontSize: 18}}> {item}</Text></ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        }
                        data={list}
                    />
                </View>
                <Text style={styles.message}>{message}</Text>
            </View>
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
    }
  });