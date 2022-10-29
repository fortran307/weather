import {createHeader} from "./appHeader.js"
import {createContent} from "./appContent.js"

export const directionOfWind = (degree) => {
  if (degree > 337.5) {return 'северный'}
  if (degree > 292.5) {return 'север-западный'}
  if (degree > 247.5) {return 'западный'}
  if (degree > 202.5) {return 'юго-западный'}
  if (degree > 157.5) {return 'южный'}
  if (degree > 122.5) {return 'юго-восточный'}
  if (degree > 62.5) {return 'восточный'}
  if (degree > 22.5) {return 'северо-восточный'}
  return 'северный'
}

export const resetWeatherContent = (city, weather) => {
  localStorage.setItem('city', JSON.stringify(city))
  document.body.innerHTML = ''
  const header = createHeader(city)
  const content = createContent(weather)
  document.body.append(
    header,
    content
  )
}

export const cToF = (celsius) => {
  return celsius * 9 / 5 + 32
}

export const fToC = (fahrenheit) => {
  return (fahrenheit - 32) * 5 / 9
}