import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const infoCard = (props) =>{

    return (
        <View style={styles.card}>
            <Text style={styles.text}>{props.title}</Text>
            <Text style={[styles.text, {color: '#d3d3d3'}]}>{props.value}</Text>
        </View>
    )}
   

         const styles = StyleSheet.create({
         card:{
         alignItems: 'center',
         margin: 10,
         minWidth: 150,
     },
     text: {
         color: '#e8e8e8',
         margin: 5,
         marginLeft: 15,
         fontSize: 18,
     },  
    });

   


export default infoCard