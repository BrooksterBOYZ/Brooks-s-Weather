document.getElementById("search-button").addEventListener("click", getWeather);
document.getElementById("location-button").addEventListener("click", getWeatherByLocation);

const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

async function getWeather() {
    const city = document.getElementById("city-input").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found.");
        } else {
            displayWeather(data);
            getWeatherForecast(city);
            getHourlyForecast(city);
        }
    } catch (error) {
        console.error("Error fetching weather data: ", error);
    }
}

async function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === "404") {
                alert("Location not found.");
            } else {
                displayWeather(data);
                getWeatherForecastByLocation(lat, lon);
                getHourlyForecastByLocation(lat, lon);
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function displayWeather(data) {
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("weather-description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

async function getWeatherForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    let forecastHtml = '';
    data.list.filter(item => item.dt_txt.includes("12:00:00")).forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        forecastHtml += `
            <div class="forecast-item">
                <h3>${date}</h3>
                <p>${item.main.temp}°C</p>
                <p>${item.weather[0].description}</p>
            </div>
        `;
    });

    document.getElementById("forecast-daily").innerHTML = forecastHtml;
}

async function getHourlyForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    let hourlyHtml = '';
    data.list.slice(0, 6).forEach(item => {
        const time = new Date(item.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        hourlyHtml += `
            <div class="hourly-item">
                <p>${time}</p>
                <p>${item.main.temp}°C</p>
                <p>${item.weather[0].description}</p>
            </div>
        `;
    });

    document.getElementById("forecast-hourly").innerHTML = hourlyHtml;
}

async function getWeatherForecastByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    let forecastHtml = '';
    data.list.filter(item => item.dt_txt.includes("12:00:00")).forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        forecastHtml += `
            <div class="forecast-item">
                <h3>${date}</h3>
                <p>${item.main.temp}°C</p>
                <p>${item.weather[0].description}</p>
            </div>
        `;
    });

    document.getElementById("forecast-daily").innerHTML = forecastHtml;
}

async function getHourlyForecastByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    let hourlyHtml = '';
    data.list.slice(0, 6).forEach(item => {
        const time = new Date(item.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        hourlyHtml += `
            <div class="hourly-item">
                <p>${time}</p>
                <p>${item.main.temp}°C</p>
                <p>${item.weather[0].description}</p>
            </div>
        `;
    });

    document.getElementById("forecast-hourly").innerHTML = hourlyHtml;
}
