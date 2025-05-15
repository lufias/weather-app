import type { Module } from 'vuex';

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherCondition[];
}

interface HourlyForecast {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherCondition[];
  pop: number;
  rain?: { '1h': number };
}

interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
}

interface WeatherDetails {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export interface WeatherState {
  currentWeather: Record<number, CurrentWeather>;
  weatherDetails: Record<number, WeatherDetails>;
}

const weather: Module<WeatherState, any> = {
  namespaced: true,
  state: {
    currentWeather: {},
    weatherDetails: {}
  },
  mutations: {
    SET_CURRENT_WEATHER(state, { locationId, weather }) {
      state.currentWeather[locationId] = weather;
    },
    SET_WEATHER_DETAILS(state, { locationId, details }) {
      state.weatherDetails[locationId] = details;
    },
    REMOVE_WEATHER(state, locationId) {
      delete state.currentWeather[locationId];
      delete state.weatherDetails[locationId];
    }
  },
  actions: {
    async fetchCurrentWeather({ commit }, { locationId, lat, lon }) {
      const API_KEY = 'a8bcd4ef1794d3d95d4ec15f5f5a15dc';
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      commit('SET_CURRENT_WEATHER', { locationId, weather: data.current });
    },
    async fetchWeatherDetails({ commit }, { locationId, lat, lon }) {
      const API_KEY = 'a8bcd4ef1794d3d95d4ec15f5f5a15dc';
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      commit('SET_WEATHER_DETAILS', { 
        locationId, 
        details: {
          lat: data.lat,
          lon: data.lon,
          timezone: data.timezone,
          timezone_offset: data.timezone_offset,
          hourly: data.hourly,
          daily: data.daily
        }
      });
    },
    removeWeather({ commit }, locationId) {
      commit('REMOVE_WEATHER', locationId);
    }
  },
  getters: {
    getCurrentWeather: (state) => (locationId: number) => state.currentWeather[locationId],
    getWeatherDetails: (state) => (locationId: number) => state.weatherDetails[locationId],
    getHourlyForecast: (state) => (locationId: number) => state.weatherDetails[locationId]?.hourly,
    getDailyForecast: (state) => (locationId: number) => state.weatherDetails[locationId]?.daily
  }
};

export default weather; 