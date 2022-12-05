import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { ref, onValue, remove } from 'firebase/database';
import database from './database';

export default function Workouts() {
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

    const sortedWorkouts = workouts.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });

    // Delete workout
    const deleteWorkout = (key) => {
        remove(ref(database, 'workouts/' + key));
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.title}>Viimeisimmät treenit</Text>
                    <FlatList 
                        renderItem={({item}) =>
                        <ListItem bottomDivider>
                          <ListItem.Content>
                            <ListItem.Subtitle style={{ fontStyle: 'italic', marginBottom: 3}}>{item.date}</ListItem.Subtitle>
                            <ListItem.Title>{ item.weight == "" ?  <Text style={{fontSize: 18}}>{item.workout}, {item.reps} toistoa</Text> : <Text style={{fontSize: 18}}>{item.workout}, {item.reps} x {item.weight} kg</Text> }</ListItem.Title>
                          </ListItem.Content>
                          <Icon type="material" name="delete" iconStyle="sharp" color="#DE9E36" onPress={() => deleteWorkout(item.key)} />
                        </ListItem>
                        }
                        data={sortedWorkouts}
                    />
                </View>
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
        paddingLeft: '5%',
        paddingBottom: '10%',
        paddingTop: '10%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20
    },
    text: {
        fontSize: 15,
        marginBottom: 15
    },
  });