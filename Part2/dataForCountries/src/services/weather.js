import axios from 'axios';

const getCityData = (city) => {
    const api_key = import.meta.env.VITE_API_KEY;
    const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`)
    return request.then(response => response.data);
}

const getWeather = (lat,lon) => {
    const api_key = import.meta.env.VITE_API_KEY;
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`);
    return request.then(response => response.data);
}

export default { getCityData, getWeather };