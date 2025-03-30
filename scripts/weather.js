document.addEventListener('DOMContentLoaded', () => {
  const apiKey = 'b3d2c4dace3b9aa57c38170417b7ae22';
  const city = 'Cozumel';

  const currentTempElement = document.getElementById('current-temp');
  const currentHumidityElement = document.getElementById('current-humidity');
  const weatherConditionsElement = document.getElementById('weather-conditions');
  const forecastTempElement = document.getElementById('forecast-temp');
  const highTempMessage = document.getElementById('high-temp-message');
  const closeAlertButton = document.getElementById('close-alert');
  const weatherAlert = document.getElementById('weather-alert');

  closeAlertButton.addEventListener('click', () => {
    weatherAlert.style.display = 'none';
  });

  async function fetchCurrentWeather() {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

      if (!response.ok) {
        throw new Error('Weather data not available');
      }

      const data = await response.json();

      currentTempElement.textContent = data.main.temp.toFixed(1);
      currentHumidityElement.textContent = data.main.humidity;

      highTempMessage.textContent = `The high temperature today in Cozumel will be ${data.main.temp_max.toFixed(1)} degrees celsius`;

      displayWeatherConditions(data.weather);

    } catch (error) {
      console.error('Error fetching current weather:', error);
      currentTempElement.textContent = 'N/A';
      currentHumidityElement.textContent = 'N/A';
      highTempMessage.textContent = 'Weather information unavailable';
    }
  }

  async function fetchForecast() {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);

      if (!response.ok) {
        throw new Error('Forecast data not available');
      }

      const data = await response.json();

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDate = tomorrow.toISOString().split('T')[0];

      const tomorrowForecast = data.list.find(item => {
        const itemDate = item.dt_txt.split(' ')[0];
        const itemTime = item.dt_txt.split(' ')[1];
        return itemDate === tomorrowDate && itemTime.startsWith('15:');
      });

      if (tomorrowForecast) {
        forecastTempElement.textContent = tomorrowForecast.main.temp.toFixed(1);
      } else {
        forecastTempElement.textContent = 'N/A';
      }

    } catch (error) {
      console.error('Error fetching forecast:', error);
      forecastTempElement.textContent = 'N/A';
    }
  }

  function displayWeatherConditions(weatherData) {
    weatherConditionsElement.innerHTML = '';

    weatherData.forEach(condition => {
      const conditionElement = document.createElement('div');
      conditionElement.className = 'weather-conditions-item';

      const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;

      conditionElement.innerHTML = `
        <img src="${iconUrl}" alt="${condition.description}" class="weather-icon">
        <div>
          <p><strong>${condition.main}</strong></p>
          <p>${condition.description}</p>
        </div>
      `;

      weatherConditionsElement.appendChild(conditionElement);
    });
  }

  fetchCurrentWeather();
  fetchForecast();
});