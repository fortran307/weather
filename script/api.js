export const getWeatherData = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ac3b2b3baaa77f26dd1cf420770af47b&lang=ru&units=metric`)
        return await response.json()
    }
    catch(error) {
        console.log(error)
    }
}
