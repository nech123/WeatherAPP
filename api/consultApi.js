import axios from "axios"
export default async function getCurrentWeather(locationCoords){

    const axios = require('axios').default
    
    
    const lon = locationCoords.longitude
    
    const lat = locationCoords.latitude

    var results = []

  await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5910c96040e3ed24cc02780951c3ba12`)
     .then(function(response){
         console.log(response);
        
    const data = response.data
    const locationName = (data.sys.country + ', ' + '' + data.name)
    const temperatureMin = data.main.temp_min
    const temperatureMax = data.main.temp_max
    const wind = data.wind.speed
    const humidity = data.main.humidity
    const currentTemperature = data.main.temp

   results = [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]

})
.catch(function (error) {
    console.log(error)
})

return results
}

