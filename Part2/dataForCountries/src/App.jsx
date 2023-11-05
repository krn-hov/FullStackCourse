import { useState, useEffect } from 'react'
import CountryView from './components/countryView'
import countryService from './services/countries'
import weatherService from './services/weather'


function App() {
  const [countries, setCountries] = useState([])
  const [mainCountry, setMainCountry] = useState([])
  const [priv, setPriv] = useState(false)
  const [data,setData] = useState([])


  useEffect(() => {
    countryService.getAll().then(countries => setData(countries))
  },[])
  
  const handleCountryChange = (event) => {
    const charSequence = event.target.value
    if (charSequence === '') {
      setCountries([])
      return
    }
    
    setPriv(false)
    const newCountries = data.filter(country => country.name.common.toLowerCase().includes(charSequence.toLowerCase()))

    if (newCountries.length === 1) {
      const countryObject = {
        name:newCountries[0].name.common,
        capital:newCountries[0].capital,
        area:newCountries[0].area,
        languages:newCountries[0].languages,
        flag:newCountries[0].flags.png,
        capitalLat:null,
        capitalLon:null,
        temp:null,
        icon:null,
        wind:null
      }

      weatherService.getCityData(countryObject.capital)
        .then(cityData => {countryObject.capitalLat = cityData[0].lat
                          countryObject.capitalLon = cityData[0].lon})
        .then(() => weatherService.getWeather(countryObject.capitalLat,countryObject.capitalLon))
        .then(weather => {countryObject.temp = weather.main.temp
                          countryObject.icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                          countryObject.wind = weather.wind.speed
                          setMainCountry(countryObject)
                          setPriv(true)})
      return
    }
    
    setCountries(newCountries)
    
  }

  const showCountry = (country) => {
    const countryObject = {
      name:country.name.common,
      capital:country.capital,
      area:country.area,
      languages:country.languages,
      flag:country.flags.png,
      capitalLat:null,
      capitalLon:null,
      temp:null,
      icon:null,
      wind:null
    }

    weatherService.getCityData(countryObject.capital)
      .then(cityData => {countryObject.capitalLat = cityData[0].lat
                        countryObject.capitalLon = cityData[0].lon})
      .then(() => weatherService.getWeather(countryObject.capitalLat,countryObject.capitalLon))
      .then(weather => {countryObject.temp = weather.main.temp
                        countryObject.icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                        countryObject.wind = weather.wind.speed
                        setMainCountry(countryObject)
                        setPriv(true)})
    return
  
  }

  return (
    <div>
      <form>
      find countries
      <input onChange={handleCountryChange}/>
      </form>
      <CountryView countries={countries} clickHandler={showCountry} priv={priv} main={mainCountry}/>
    </div>
  )
}

export default App
