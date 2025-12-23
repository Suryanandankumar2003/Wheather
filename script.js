let cityClockInterval = null;

/* ================= LOADER ================= */

function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
}

function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
}

/* ================= INDIA CLOCK ================= */

function startIndiaClock() {
    function updateIndiaTime() {
        const now = new Date();
        const options = {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: "2-digit",
            month: "short",
            year: "numeric"
        };
        document.getElementById("indiaTime").innerText =
            new Intl.DateTimeFormat("en-IN", options).format(now);
    }
    updateIndiaTime();
    setInterval(updateIndiaTime, 1000);
}

/* ================= AUTOCOMPLETE ================= */

async function searchCity() {
    const query = document.getElementById("city").value;
    const list = document.getElementById("suggestions");
    if (query.length < 1) return list.innerHTML = "";

    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`
    );
    const data = await res.json();

    list.innerHTML = "";
    if (!data.results) return;

    data.results.forEach(city => {
        const li = document.createElement("li");
        li.innerText = `${city.name}, ${city.country}`;
        li.onclick = () => {
            document.getElementById("city").value = city.name;
            list.innerHTML = "";
            showLoader();
            getWeatherByCity(city.name);
        };
        list.appendChild(li);
    });
}

/* ================= GEOLOCATION ================= */

window.onload = () => {
    startIndiaClock();
    getCurrentLocationWeather();
};

function getCurrentLocationWeather() {
    if (!navigator.geolocation) return;
    showLoader();
    navigator.geolocation.getCurrentPosition(pos => {
        getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
    });
}

/* ================= WEATHER ================= */

function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) return alert("Enter city name");
    showLoader();
    getWeatherByCity(city);
}

async function getWeatherByCity(city) {
    const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    ).then(r => r.json());

    if (!geo.results) return hideLoader();

    const { latitude, longitude, name } = geo.results[0];
    fetchWeather(latitude, longitude, name);
}

async function getWeatherByCoords(lat, lon) {
    const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}`
    ).then(r => r.json());

    fetchWeather(lat, lon, geo.results?.[0]?.name || "Your Location");
}

/* ================= CITY CLOCK ================= */

function startCityClock(timezone) {
    if (cityClockInterval) clearInterval(cityClockInterval);

    function updateCityTime() {
        const now = new Date();
        const options = {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: "2-digit",
            month: "short",
            year: "numeric"
        };
        document.getElementById("localTime").innerText =
            new Intl.DateTimeFormat("en-US", options).format(now);
    }

    updateCityTime();
    cityClockInterval = setInterval(updateCityTime, 1000);
}

/* ================= CORE WEATHER + AQI ================= */

async function fetchWeather(lat, lon, cityName) {
    const weather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&past_days=1&timezone=auto`
    ).then(r => r.json());

    const aqiData = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`
    ).then(r => r.json());

    startCityClock(weather.timezone);

    const hour = Number(
        new Date().toLocaleString("en-US", {
            hour: "numeric",
            hour12: false,
            timeZone: weather.timezone
        })
    );
    const isNight = hour < 6 || hour >= 18;
    const code = weather.current_weather.weathercode;

    let condition = "Clear";
    if (code === 0) condition = isNight ? "Clear 🌙" : "Clear ☀️";
    else if ([1,2,3].includes(code)) condition = isNight ? "Cloudy ☁️🌙" : "Cloudy ☁️";
    else if ([51,61,63,65].includes(code)) condition = "Rainy 🌧️";
    else if ([71,73,75].includes(code)) condition = "Snow ❄️";

    document.getElementById("cityName").innerText = cityName;
    document.getElementById("weatherCondition").innerText = condition;
    document.getElementById("windSpeed").innerText = weather.current_weather.windspeed;

    document.getElementById("todayCurrent").innerText = weather.current_weather.temperature;
    document.getElementById("todayMax").innerText = weather.daily.temperature_2m_max[1];
    document.getElementById("todayMin").innerText = weather.daily.temperature_2m_min[1];
    document.getElementById("yesterdayMax").innerText = weather.daily.temperature_2m_max[0];
    document.getElementById("yesterdayMin").innerText = weather.daily.temperature_2m_min[0];
    document.getElementById("tomorrowMax").innerText = weather.daily.temperature_2m_max[2];
    document.getElementById("tomorrowMin").innerText = weather.daily.temperature_2m_min[2];

    const aqi = aqiData.current.us_aqi;
    let suggestion = "Air quality is normal.", risk = "None", activity = "Normal", mask = "No";

    if (aqi > 200) {
        suggestion = "Severe pollution. Stay indoors and avoid outdoor exposure.";
        risk = "Everyone";
        activity = "Indoor only";
        mask = "N95 mandatory";
    }

    document.getElementById("aqiValue").innerText = aqi;
    document.getElementById("aqiStatus").innerText = aqi > 200 ? "Hazardous ☠️" : "Normal";
    document.getElementById("aqiSuggestion").innerText = suggestion;
    document.getElementById("aqiRisk").innerText = risk;
    document.getElementById("aqiActivity").innerText = activity;
    document.getElementById("aqiMask").innerText = mask;

    hideLoader();
    document.getElementById("dashboard").classList.remove("hidden");
}
