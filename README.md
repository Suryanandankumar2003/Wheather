# 🌍 Weather Dashboard (Docker Deployment)

A responsive **Weather & Air Quality Index (AQI) Dashboard** built using **HTML, CSS, and JavaScript**, providing real-time weather data, health-focused AQI insights, and GPS-based location detection.  
The application is **containerized using Docker** and can be deployed on cloud platforms or hosted as a static site.

---

## 🚀 Features

- 🌦 **Real-time Weather Information**
  - Current temperature
  - Today, yesterday, and tomorrow min/max temperatures
  - Wind speed
  - Weather conditions with day/night symbols (☀️ 🌙 ☁️ 🌧️ ❄️)

- 🫁 **Air Quality Index (AQI) & Health Advice**
  - Live AQI values
  - Minimal health advice for normal conditions
  - Detailed health alerts for **hazardous AQI levels**
  - Risk group, activity, and mask recommendations

- 📍 **Location-Based Weather**
  - GPS-based weather detection (triggered only when user clicks the 📍 button)
  - City search with autocomplete suggestions

- ⏱ **Live Clocks**
  - 🇮🇳 Running India Standard Time (IST) clock
  - City-specific local time based on timezone

- 🔄 **Loading Indicator**
  - Displays a spinner while fetching weather and AQI data

- 🎨 **Clean & Responsive UI**
  - Modern card-based layout
  - Mobile-friendly design

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **APIs:** Open-Meteo Weather API, Open-Meteo Air Quality API  
- **Deployment:** Docker  
- **Version Control:** Git & GitHub  

---

## 📂 Project Structure
weather-dashboard/
 ├── index.html └── README.md
 ├── style.css
 ├── script.js 