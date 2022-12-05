import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { push, ref } from 'firebase/database';
import database from './database';

export default function Profile() {
    const [date, setDate] = useState("");
    const [workout, setWorkout] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [message, setMessage] = useState("");

    const initialFocus = useRef(null);

    // Save workout
    const saveWorkout = () => {
        if (workout == '0' || workout == '') {
            setMessage("Valitse liike");
        } else if (reps == "") {
            setMessage("Merkkaa toistojen määrä");
        } else {
            let parts = date.split('.');
            let newdate = parts[2] + "-" + parts[1] + "-" + parts[0];
            let isValidDate = Date.parse(newdate);
                if (isNaN(isValidDate)) {
                    setMessage("Tarkista, että päivä on oikein (pp.kk.vvvv)");
                } else {
            push(
            ref(database, 'workouts/'),
            { 'date': newdate, 'workout': workout, 'reps': reps, 'weight': weight});
            setMessage("Tallennettu!");











            setDate("");
            setWorkout("0");
            setReps("");
            setWeight("");
            initialFocus.current.focus();
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.main}>
                <View style={{ flex:1, marginTop:20 }}>
                    <View>

                        <TextInput  keyboardType='numeric' placeholder='Päivämäärä (pp.kk.vvvv)' ref={initialFocus} style={ styles.input }
                        onChangeText={(date) => setDate(date)}
                        value={date}/>
                        </View>
                        <View style={styles.picker}>
                            <SelectPicker
                                selectedValue={workout}
                                onValueChange={(itemValue, itemIndex) =>
                                setWorkout(itemValue)
                                }>
                                <SelectPicker.Item label='Valitse liike' value='0' />
                                <SelectPicker.Item label='Back squat' value='Back squat' />
                                <SelectPicker.Item label='Bench press' value='Bench press' />
                                <SelectPicker.Item label='Bent-over row' value='Bent-over row' />
                                <SelectPicker.Item label='Deadlift' value='Deadlift' />
                                <SelectPicker.Item label='Front squat' value='Front squat' />
                                <SelectPicker.Item label='Overhead press' value='Overhead press' />
                                <SelectPicker.Item label='Pull-up' value='Pull-up' />
                                <SelectPicker.Item label='Push-ups' value='Push-up' />
                            </SelectPicker>
                        </View>
                        
                        <View style={{ flexDirection: 'row'}}>
                            <TextInput keyboardType='numeric' style={styles.input2} placeholder='Toistot (lkm)' onChangeText={reps => setReps(reps)} value={reps} />
                            <TextInput keyboardType='numeric' style={styles.input2} placeholder='Paino (kg)' onChangeText={weight => setWeight(weight)} value={weight} />
                        </View>
                        <View style={{ justifyContent: 'flex-start'}}>

                        <Pressable style={styles.button} onPress={saveWorkout}>
                            <Text style={styles.buttontext}>Lisää</Text>
                        </Pressable>

                        <Text style={styles.message}>{message}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
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
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: '10%',
        marginBottom: 20
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30
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
        backgroundColor: '#DE9E36',
        elevation: 3,
        borderRadius: 4,
        marginTop: 20
    },
    buttontext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
  });