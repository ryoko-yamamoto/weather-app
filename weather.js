function getWeather() {
  const lat = document.getElementById("lat").value;
  const lon = document.getElementById("lon").value;
  const api_key = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  const weather_api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
  const geocode_api = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${api_key}`;

  fetch(weather_api)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const weather = data.weather[0].main;
        const temp = Math.round(data.main.temp - 273.15);
        const min_temp = Math.round(data.main.temp_min - 273.15);
        const max_temp = Math.round(data.main.temp_max - 273.15);

        document.getElementById("weather").innerText = weather;
        document.getElementById("temp").innerText = `${temp}℃`;
        document.getElementById(
          "temp-range"
        ).innerText = `Min-Temp: ${min_temp}℃\nMax-Temp: ${max_temp}℃`;

        const weatherImage = document.getElementById("weather-image");
        weatherImage.style.display = "block";

        switch (weather.toLowerCase()) {
          case "thunderstorm":
            weatherImage.src = "images/thunderstorm.jpg";
            break;
          case "drizzle":
            weatherImage.src = "images/drizzle.jpg";
            break;
          case "rain":
            weatherImage.src = "images/rain.jpg";
            break;
          case "snow":
            weatherImage.src = "images/snow.jpg";
            break;
          case "mist":
          case "smoke":
          case "haze":
          case "dust":
          case "fog":
          case "sand":
          case "ash":
          case "squall":
          case "tornado":
            weatherImage.src = "images/atmosphere.jpg";
            break;
          case "clear":
            weatherImage.src = "images/clear.jpg";
            break;
          case "clouds":
            weatherImage.src = "images/clouds.jpg";
            break;
          default:
            weatherImage.style.display = "none";
        }

        fetch(geocode_api)
          .then((response) => response.json())
          .then((locationData) => {
            if (locationData.length > 0) {
              const locationName = locationData[0].name;
              document.getElementById("location").innerText = locationName;
            } else {
              document.getElementById("location").innerText =
                "Unknown Location";
            }
          })
          .catch((error) => {
            console.error("Error fetching the location data", error);
            document.getElementById("location").innerText =
              "Error fetching location";
          });
      } else {
        document.getElementById("weather").innerText =
          "Error: Failed to retrieve data";
        document.getElementById("temp").innerText = "";
        document.getElementById("temp-range").innerText = "";
        document.getElementById("weather-image").style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Error fetching the weather data", error);
    });
}
