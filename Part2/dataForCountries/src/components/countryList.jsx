const CountryList = ({countries, clickHandler}) => {
    return (
        <ul>
            {countries.map(country => <li key={country.name.common}>
                {country.name.common} <button onClick={() => clickHandler(country)}>show</button>
                </li>)}
        </ul>
    )
}

export default CountryList