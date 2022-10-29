import { getWeatherData } from "./api.js";
import { handleWeatherByGeolocation } from "./geolocation.js"
import { resetWeatherContent } from "./helper.js"
import { cToF } from "./helper.js"
import { fToC } from "./helper.js"

export const createHeader = (city) => {
  const header = document.createElement('header');
  const headerContainer = document.createElement('div');
  const headerCity = document.createElement('div');
  const headerUnits = document.createElement('div');
  const cityName = document.createElement('h1');
  const cityChange = document.createElement('button');
  const cityMy = document.createElement('button');
  const cityInner = document.createElement('div');
  const unitContainer = document.createElement('div');
  const unitsC = document.createElement('button');
  const unitsF = document.createElement('button');
  const searchBlock = document.createElement('div');
  const searchInput = document.createElement('input');
  const searchBtn = document.createElement('button');
  const errorBlock = document.createElement('p');

  header.classList.add('header');
  headerContainer.classList.add('container', 'header__container');
  headerCity.classList.add('header__city');
  unitContainer.classList.add('header__units');
  cityChange.classList.add('city__change', 'btn-reset');
  cityMy.classList.add('city__location', 'btn-reset');
  cityName.classList.add('city__name');
  cityInner.classList.add('city__inner');
  unitsC.classList.add('units__c', 'btn-reset', 'unit-current');
  unitsF.classList.add('units__f', 'btn-reset');
  searchBlock.classList.add('search');
  searchInput.classList.add('search__input');
  searchBtn.classList.add('search__btn');
  errorBlock.classList.add('search__error')
  
  searchBtn.textContent = 'Ok';
  cityName.textContent = city;
  cityChange.textContent = 'Сменить город';
  cityMy.textContent = 'Моё местоположение';
  unitsC.textContent = 'C';
  unitsF.textContent ='F';

  cityMy.addEventListener('click', handleWeatherByGeolocation)

  cityChange.addEventListener('click', () => {
    headerCity.innerHTML = ''
    searchBlock.append(searchInput, searchBtn, errorBlock)
    headerCity.append(searchBlock)
  })

  const showError = (message) => {
    errorBlock.classList.add('show-error')
    errorBlock.textContent = message
  }
  
  searchBtn.addEventListener('click', async () => {
    if (!searchInput.value) {
      // пустой return прерывает выполнение функции
      return
    }

    try {
      const weather = await getWeatherData(searchInput.value)
      console.log(weather);

      if (weather.message) {
        showError(weather.message)
        // пустой return прерывает выполнение функции
        return
      }

      resetWeatherContent(weather.name, weather)
    } catch (error) {
      console.log(error)
    }
  })

  window.addEventListener('click', (e) =>{
    if (e.target == searchInput || e.target == searchBtn || e.target == cityChange) {
      return
    } else {
      headerCity.innerHTML = ''
      errorBlock.classList.remove('show-error')
      searchInput.value = ''
      headerCity.append(cityName, cityInner)
    }
  })

  unitsC.addEventListener('click', () => {
    if (unitsC.classList.contains('unit-current')) {
      return
    } else {
      unitsF.classList.remove('unit-current')
      unitsC.classList.add('unit-current')
      document.querySelector('.weather__units').textContent = ' c'
      document.querySelector('.weather__temperature').textContent = Math.round(fToC(document.querySelector('.weather__temperature').textContent))
    }

  })

  unitsF.addEventListener('click', () => {
    if (unitsF.classList.contains('unit-current')) {
      return
    } else {
      unitsF.classList.add('unit-current')
      unitsC.classList.remove('unit-current')
      document.querySelector('.weather__units').textContent = ' f'
      document.querySelector('.weather__temperature').textContent = Math.round(cToF(document.querySelector('.weather__temperature').textContent))
    }

  })

  header.append(headerContainer);
  headerContainer.append(headerCity, headerUnits);
  cityInner.append(cityChange, cityMy);
  headerCity.append(cityName, cityInner);
  headerUnits.append(unitsC, unitsF);

  return header
}