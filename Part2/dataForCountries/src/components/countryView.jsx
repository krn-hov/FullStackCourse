import Headline from './headline'
import CountryList from './countryList'

const CountryView = ({countries, clickHandler, priv, main, weather}) => {
    
    if(priv) {
        return (
            <div>
                <Headline country={main} capitalWeather={weather}/>
            </div>
        )
    }
    if(countries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }

    return (
        <CountryList countries={countries} clickHandler={clickHandler}/>
    )
}

export default CountryView