import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import React, { useState, useEffect, Component } from 'react';
import { Feather, EvilIcons, Fontisto } from '@expo/vector-icons';
import MainCard from './components/MainCard';
import InfoCard from './components/InfoCard';
import * as Location from 'expo-location'
import getCurrentWeather from './api/consultApi';


export default function App() {

  useEffect(() => {
    setCurrentWeather()
  }, [])

 

  
  const axios = require('axios')
  const [darkTheme, setDarkTheme] = useState(true)
  const [currentTemperature, setCurrentTemperature] = useState('Não definido')
  const [wind, setWind] = useState('65')
  const [humidity, setHumidity] = useState('82')
  const [temMin, setTemperatureMin] = useState ('21')
  const [temMax, setTemperatureMax] = useState ('31')
  const [locationCoords, setLocationCoords] = useState(null)
  const [locationName, setLocationName] = useState('Brasil, Itabuna')
  


  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? '#232634' : '#f2f2f2',
      alignItems: 'center',

    },

    temperature:{
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 5,
    },
    temperatureText:{
      color: darkTheme ? '#e0e0e0' : 'black',
      fontSize: 50,
    },
    refreshButton:{
      position: 'absolute',
      margin: 35,
      marginLeft: 15,
      alignSelf: 'flex-start'
    },
    cardView:{
      color: darkTheme? 'black' : 'white',
      margin: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },

    
    info:{
      alignItems  :'center',
      backgroundColor: darkTheme ? '#393e54' : '#8f8f8f',
      borderRadius: 25,
      width: 370,
      height: 240
    },

    infoText:{
      color: darkTheme ? '#e0e0e0' : 'white',
      margin: 13,
      fontSize: 24,
      fontWeight:'bold'
    },


    infoCards:{
      flexDirection: 'row',
      flexWrap: 'wrap',
  },

  

  themeButton:{
    margin: 10,
    marginLeft: 300,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25
  },
  square:{
    backgroundColor: darkTheme? '#f2f2f2' : '#0d0c0c',
    justifyContent: 'center',
    borderRadius:20,
    marginRight: 20,
    width: 50,
    height:25,
  },

  circleButton:{
    backgroundColor: darkTheme? '#232634' : '#f2f2f2',
    alignSelf: darkTheme ? 'flex-end' : 'flex-start',
    margin: 5,
    width: 20,
    height: 20,
    borderRadius: 50
  }

   });


  async function getLocation(){
    let{status} = await Location.requestBackgroundPermissionsAsync()
    if(status !== 'granted'){
      setErrorMsg('Sem permissão')
    } else{
      let location = await Location.getCurrentPositionAsync({})
       await setLocationCoords(location.coords)
    }
  }

  
   
    async function setCurrentWeather(){
      await getLocation()
      const data = await getCurrentWeather(locationCoords)
 
      setCurrentTemperature(convertKelvinToC(data[0]))
      setTemperatureMin(convertKelvinToC(data[1]))
      setTemperatureMax(convertKelvinToC(data[2]))
      setLocationName(data[3])
      setWind(data[4])
      setHumidity(data[5])
    
    }
    
    function convertKelvinToC(kelvin){
      return parseInt(kelvin - 273)
    }

    
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> setCurrentWeather()} style={styles.refreshButton}>
      <EvilIcons name="refresh" size={25} color={darkTheme ? 'white' : 'black'}/>
      </TouchableOpacity>
     

      <Feather name="sun" style={{marginTop: 50}} size={46} color={darkTheme ? 'yellow' : 'orange'}  />

        <View  style={styles.temperature}>

          <Text style={styles.temperatureText}>{currentTemperature}</Text>

          <Text style={[styles.temperatureText, {fontSize: 16}]}>°C</Text>
        
        </View>

        <Text style={[styles.temperatureText, {fontSize:14}]}>{locationName}, {new Date().toLocaleString()}</Text>

        <View style={styles.cardView}>
    
      <MainCard title={'Manhã'} backgroundColor={darkTheme? '#ff873d' : '#cc6e30'} 
      temperature={parseInt(humidity/2)} icon={'morning'}></MainCard>

      <MainCard title={'Tarde'} backgroundColor={darkTheme? '#D29600' : '#fcc63f'}
       temperature={parseInt(wind*12)}icon={'afternoon'}></MainCard>
      <MainCard title={'Noite'} backgroundColor={darkTheme? '#008081' : '#388788'}
       temperature={parseInt(wind*7)}icon={'night'}></MainCard>
      
    </View>

    <View style={styles.info}>
    <Text style={styles.infoText}>Informações adicionais</Text>
    <View style={styles.infoCards}>
    <InfoCard title={'Vento'} value={wind + ' m/h'}></InfoCard>
    <InfoCard title={'Umidade'} value={humidity + '%'}></InfoCard>
    <InfoCard title={'Temp. Min'} value={temMin + '°C'}></InfoCard>
    <InfoCard title={'Temp. Max'} value={temMax + '°C'}></InfoCard>
    </View>
    </View>
    
    <View style={styles.themeButton}>
      <View style={styles.square}>
        <TouchableOpacity style={styles.circleButton} onPress={() => darkTheme? setDarkTheme(false) : setDarkTheme(true)}></TouchableOpacity>
      </View>

    </View>

    </View>
    
  );
  }