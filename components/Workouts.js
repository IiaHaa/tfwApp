import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, StatusBar, FlatList, TextInput, Button } from 'react-native';
import { API_URL, API_KEY } from '@env';

export default function Workouts() {
    const [keyword, setKeyword] = useState('');
    const [workouts, setWorkouts] = useState([]);
   
    const getWorkouts = () => {
      fetch(`${API_URL}${keyword}`, {
        headers: {
          'X-Api-Key': `${API_KEY}`
        }
      })
      .then(response => response.json())
      .then(responseJson => setWorkouts(responseJson))
      .catch(error => { 
          Alert.alert('Error', error.message); 
      });
    }

    const listSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "#CED0CE",
              marginLeft: "10%"
            }}
          />
        );
      };
    

    return (
        <View style={styles.container}>
        <StatusBar hidden={true} />
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({item}) => 
            <View>
              <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.name}</Text>
            </View>}
          data={workouts} 
          ItemSeparatorComponent={listSeparator} />
        <TextInput style={{fontSize: 18, width: 200}} placeholder='keyword' 
          onChangeText={text => setKeyword(text)} />
        <Button title="Find" onPress={getWorkouts} />
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