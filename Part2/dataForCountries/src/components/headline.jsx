const Headline = ({country}) => {
    const c = country
    
    return (
        <div>
            <h1>{c.name}</h1>
            <p>capital {c.capital}</p>
            <p>area {c.area}</p>
            <h2>languages</h2>
            <ul>
            {Object.values(c.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={c.flag}/>
            <h2>Weather in {c.capital}</h2>
            <p>temperature {c.temp} Celcius</p>
            {<img src={c.icon}/>}
            <p>wind {c.wind} m/s</p>
        </div>
    )
}

export default Headline