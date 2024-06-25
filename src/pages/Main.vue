<template>
  <q-page class="weather-page">
    <q-card class="main-card">
    <div class="input-section">
      <h2>Weather Api</h2>
      <q-input v-model="newLocation" label="Enter Location" />
      <q-btn @click="addWeatherWidget" label="Tambahkan Widget" color="primary" text-color="white" />
    </div>
    <div class="widgets-section">
      <q-card v-for="(weather, index) in weatherStore.weatherWidgets" :key="index" class="weather-widget">
        <div class="header">
          <div>{{ weather.name }}</div>
        </div>
        <div class="temperature-info">
          <div class="current-temp">{{ convertTemp(weather.main.temp) }}</div>
          <div class="min-max">
            <div>⬆ {{ convertTemp(weather.main.temp_max) }}</div>
            <div>⬇ {{ convertTemp(weather.main.temp_min) }}</div>
          </div>
        </div>
        <div class="weather-icon">
          <q-icon :name="getWeatherIcon(weather.weather[0].main)" size="100px" />
        </div>
        <div class="day">Sunday</div>
        <div class="details">
          <div class="detail">
            <q-icon name="near_me" />
            <span>{{ weather.wind.speed }} KPH {{ getWindDirection(weather.wind.deg) }}</span>
          </div>
          <div class="detail">
            <q-icon name="opacity" />
            <span>{{ weather.main.humidity }}% Kelembaban</span>
          </div>
          <div class="detail">
            <q-icon name="umbrella" />
            <span>{{ weather.clouds.all }}% Kemungkinan Hujan</span>
          </div>
        </div>
        <q-btn @click="removeWidget(index)" label="Remove Widget" color="negative" />
      </q-card>
    </div>
  </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useWeatherStore } from '../stores/store.js';
import { QIcon, QCard, QPage, QInput, QBtn } from 'quasar';

const weatherStore = useWeatherStore();
const newLocation = ref('');

const weatherIconMapping = {
  Clear: 'wb_sunny',
  Clouds: 'cloud',
  Rain: 'grain',
  Drizzle: 'grain',
  Thunderstorm: 'flash_on',
  Snow: 'ac_unit',
  Mist: 'blur_on',
  Smoke: 'blur_on',
  Haze: 'blur_on',
  Dust: 'blur_on',
  Fog: 'blur_on',
  Sand: 'blur_on',
  Ash: 'blur_on',
  Squall: 'blur_on',
  Tornado: 'toys',
};

const convertTemp = (tempInCelsius) => {
  return `${tempInCelsius.toFixed(1)} °C`;
};

const getWeatherIcon = (weatherMain) => {
  return weatherIconMapping[weatherMain] || 'wb_cloudy';
};

const getWindDirection = (degree) => {
  const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
  const index = Math.floor((degree / 45) + 0.5) % 8;
  return directions[index];
};

const addWeatherWidget = async () => {
  await weatherStore.fetchWeather(newLocation.value);
  newLocation.value = '';
};

const removeWidget = (index) => {
  weatherStore.removeWidget(index);
};

</script>

<style scoped>
.weather-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: lightskyblue;
  padding: 20px;
}

.main-card {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
}

.input-section {
  display: absolute;
  gap: 10px;
  margin-bottom: 20px;
}

.widgets-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.weather-widget {
  background-color: lightskyblue;
  padding: 20px;
  border-radius: 10px;
  color: #1e1e1e;
  text-align: center;
  width: 300px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
}

.temperature-info {
  font-size: 2.5em;
  margin: 20px 0;
}

.min-max {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.weather-icon {
  margin: 20px 0;
}

.day {
  font-size: 1.2em;
  margin: 10px 0;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9em;
  gap: 5px;
}

.detail {
  display: flex;
  align-items: center;
}

.detail span {
  margin-left: 5px;
}
</style>