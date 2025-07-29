document.querySelector('#searchForm').addEventListener('submit', async (event) =>{
    
    event.preventDefault();


    const cityName = document.querySelector('#city_name').value
    const apiKey = "da4d5ba88443ac271c1966ee14d4afbb"
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`
    const results = await fetch(apiUrl);
    const json = await results.json();



    if (json.cod != 200){
        showAlert(`${cityName} não retornou nada`)
    } else {
        console.log(json)
        showJsonInfos({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
            weatherIcon: json.weather[0].icon,
            description: json.weather[0].description
        })
    }

    if(!cityName) {
        return showAlert(`digite uma cidade válida nome da cidade=${cityName}.`)
    }

})


function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg
}

function showJsonInfos(json) {
    showAlert('')
    document.querySelector('#weatherContainer').style.display = 'flex'
    document.querySelector('#cityName').innerHTML = `${json.city}, ${json.country}`
    document.querySelector('#currentTemp').innerHTML = `${json.temp.toFixed(0)}°C`
    document.querySelector('#weatherDescription').innerHTML = `${json.description}`
    document.querySelector('#maxTempDesc').innerHTML = `${json.tempMax.toFixed(0)}°C`
    document.querySelector('#minTempDesc').innerHTML = `${json.tempMin.toFixed(0)}°C`
    document.querySelector('#windSpeedDesc').innerHTML = `${json.windSpeed.toFixed(0)}km/h`
    document.querySelector('#humidityDesc').innerHTML = `${json.humidity}%`
    document.querySelector('#weatherIcon').setAttribute('src', `https://openweathermap.org/img/wn/${json.weatherIcon}@2x.png`)
}