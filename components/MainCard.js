import React from 'react';
import {useSate, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather, EvilIcons, Fontisto } from '@expo/vector-icons';


const MainCard = (props) =>{
   

        const Icon = () => {
            if(props.icon === 'morning'){
                return(
                <Feather name="sun" style={styles.cardIcon} size={50} color="orange"  />
                )
            }

            if(props.icon === 'afternoon'){
                return(
                <Fontisto name="day-cloudy" style={styles.cardIcon} size={50} color="orange"  />
                )
            }

            if(props.icon === 'night'){
                return(
                <Feather name="cloud-rain" style={styles.cardIcon} size={50} color="orange"  />
                )
            }
        }

       
        return  (
            <View style={[styles.card, {backgroundColor: props.backgroundColor}]}>
                <Text style={styles.cardHourText}>{props.title}</Text>
                <Icon></Icon>
                    <Text style={styles.cardTemperatureText}>{props.temperature}</Text>
            </View>
        )
    }
    
         const styles = StyleSheet.create({

        card:{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            margin: 10,
            width: 110,
            height: 210
        },
        
        refreshButton:{
          position: 'absolute',
          margin: 30,
          alignSelf: 'flex-start'
        },
        text:{
            color: 'white',
            margin: 15,
            fontSize: 20,
        },
        cardIcon:{
            color: 'white',
            margin: 18,

        },
      });

export default MainCard;