
# 🌍 Weather Dashboard (Docker Deployment)

A responsive **Weather & Air Quality Index (AQI) Dashboard** built using **HTML, CSS, and JavaScript**.  
The application provides real-time weather updates, air quality health advice, GPS-based location detection, and timezone-aware live clocks.  
It is **Dockerized** and can be deployed on cloud platforms or static hosting services.

---

## 🚀 Features

### 🌦 Weather Information
- Current temperature
- Today, yesterday, and tomorrow min/max temperature
- Wind speed
- Weather conditions with **day/night symbols** (☀️ 🌙 ☁️ 🌧️ ❄️)

### 🫁 Air Quality & Health Advice
- Real-time AQI value
- Minimal advice for normal AQI levels
- **Detailed health guidance for hazardous AQI**
- Risk group, activity, and mask recommendations

### 📍 Location & Search
- GPS-based weather detection (triggered only when user clicks 📍)
- City search with autocomplete suggestions

### ⏱ Live Clocks
- 🇮🇳 Running **India Standard Time (IST)** clock
- City-specific local time based on timezone

### 🔄 User Experience
- Loading spinner during API calls
- Clean, card-based UI
- Responsive design for mobile and desktop

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **APIs:** Open-Meteo Weather API, Open-Meteo Air Quality API  
- **Containerization:** Docker  
- **Version Control:** Git & GitHub  

---

## 📂 Project Structure

weather-dashboard/ ├── index.html ├── style.css ├── script.js └── README.md

---

## ▶️ Run Locally (Without Docker)

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/weather-dashboard.git

2. Open the project folder:

cd weather-dashboard


3. Open index.html in your browser.



> 📍 Note: Location (GPS) feature works only on HTTPS or localhost.




---

🐳 Run Using Docker

Build Docker Image

docker build -t weather-dashboard .

Run Docker Container

docker run -d -p 80:80 --name weather-container weather-dashboard

Access Application

Open browser and visit:

http://localhost


---

☁️ Deployment Options

Docker on cloud VM (AWS EC2 / Azure VM / GCP VM)

GitHub Pages

Netlify



---

🔐 Notes

Location permission is requested only when the user clicks the 📍 button

No API keys are required (free public APIs)

HTTPS is required for GPS functionality



---

📜 License

This project is open-source and intended for learning and personal use.


---

🙌 Acknowledgements

Open-Meteo for providing free weather and air quality APIs

Browser Geolocation API for location services