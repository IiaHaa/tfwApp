import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { API_URL, API_KEY } from '@env';

export default function NewWorkout() {
    const [workout, setWorkout] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");

    const listWorkouts = () => {
        fetch(`${API_URL}${type}`, {
          headers: {
            'X-Api-Key': `${API_KEY}`
          }
        })
        .then(response => response.json())
        .then(responseJson => setWorkouts(responseJson))
        .catch(error => { 
            Alert.alert('Error', error.message); 
        });
        console.log(workouts);
        if (workouts.length == 0) {
            setMessage("Ei pystytty hakemaan treenejä")
        }

      }

    const add = () => {
        if (type === '0' || type === "") {
            setMessage("Valitse treenin tyyppi");
        }
        else {
            setMessage("Treeni lisätty!");
            setWorkout("");
            setType("");
            setReps("");
            setWeight("");
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flex:1, marginTop:20 }}>
                <Text style={styles.text}>Lisää treeni</Text>

                    <View style={styles.picker}>
                        <SelectPicker
                            selectedValue={type}
                            onValueChange={(itemValue, itemIndex) =>
                            setType(itemValue)
                            }>
                            <SelectPicker.Item label='Select workout type' value='0' />
                            <SelectPicker.Item label='Biceps' value='biceps' />
                            <SelectPicker.Item label='Powerlifting' value='powerlifting' />
                            <SelectPicker.Item label='Strength' value='strength' />
                        </SelectPicker>
                    </View>

                    <Pressable style={styles.button} onPress={listWorkouts}>
                        <Text style={styles.buttontext}>Search</Text>
                    </Pressable>

                    <View style={styles.picker}>
                        <SelectPicker
                            selectedValue={workout}
                            onValueChange={(itemValue, itemIndex) =>
                            setWorkout(itemValue)
                        }>
                            <FlatList 
                                style={{marginLeft : "5%"}}
                                keyExtractor={(item, index) => index.toString()} 
                                renderItem={({item}) => 
                                    <View>
                                        <SelectPicker.Item label={item.name} value={item.name} />
                                    </View>}
                                data={workouts} 
                                />
                        </SelectPicker>
                    </View>
                    
                    <View style={{ flex: 1, flexDirection: 'row'}}>
                        <TextInput keyboardType='numeric' style={styles.input2} placeholder='Toistot (lkm)' onChangeText={reps => setReps(reps)} value={reps} />
                        <TextInput keyboardType='numeric' style={styles.input2} placeholder='Paino (kg)' onChangeText={weight => setWeight(weight)} value={weight} />
                    </View>
                    <View style={{flex: 2, justifyContent: 'flex-start'}}>

                    <Pressable style={styles.button} onPress={add}>
                        <Text style={styles.buttontext}>Lisää</Text>
                    </Pressable>

                    <Text style={styles.message}>{message}</Text>
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
        paddingLeft: '10%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: '10%',
        marginBottom: 10
    },
    text: {
        fontSize: 15,
        marginBottom: 15
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    input: {
        width: 250,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 3
    },
    input2: {
        width: 120,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 3,
        marginRight: 10
    },
    picker: {
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 0,
        marginBottom: 10
    },
    button: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#C6B5FF',
        elevation: 3,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 30
    },
    buttontext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
  });