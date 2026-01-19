const API_KEY = "16a585adca5eff49150d52dbafbd3080";

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const currentURL = 
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const forecastURL = 
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    fetch(currentURL)
        .then(res => res.json())
        .then(data => showCurrentWeather(data))
        .catch(() => alert("City not found"));

    fetch(forecastURL)
        .then(res => res.json())
        .then(data => showForecast(data));
}

function showCurrentWeather(data) {
    const div = document.getElementById("currentWeather");
    div.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <p><strong>${data.weather[0].description}</strong></p>
        <p>🌡 Temp: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;
}

function showForecast(data) {
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyData.forEach(day => {
        const date = new Date(day.dt_txt).toDateString();
        forecastDiv.innerHTML += `
            <div class="forecast-card">
                <h4>${date}</h4>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
                <p>${day.weather[0].description}</p>
                <p>${day.main.temp} °C</p>
            </div>
        `;
    });
}
