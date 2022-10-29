import {getWeatherData} from "./api.js"
import {resetWeatherContent} from "./helper.js"

export const handleWeatherByGeolocation = () => {
    const option = {
        enableHighAccuracy:true, 
        timeout: 5000, 
        maximumAge: 0
    }

    const success = async (pos) => {
        const crd = pos.coords

        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&lang=ru&apiKey=44d9cd8e543e4f92a7935c30539eee7e`)

        const result = await response.json()
        
        const weather = await getWeatherData(result.features[0].properties.city)
        resetWeatherContent(result.features[0].properties.city, weather)
    }

    const error = (err) => {
        console.log(err.code + ' ' + err.massage)
    }

    //https://developer.mozilla.org/ru/docs/Web/API/Geolocation/getCurrentPosition
    // success, error, option о них подробно рассказано в статье выше
    navigator.geolocation.getCurrentPosition(success, error, option)
}