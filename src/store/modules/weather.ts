import type { Module } from 'vuex';

export interface WeatherState {
  weatherByLocation: Record<number, any>; // key: location id, value: weather data
}

const weather: Module<WeatherState, any> = {
  namespaced: true,
  state: {
    weatherByLocation: {}
  },
  mutations: {
    SET_WEATHER(state, { locationId, weather }) {
      state.weatherByLocation[locationId] = weather;
    },
    REMOVE_WEATHER(state, locationId) {
      delete state.weatherByLocation[locationId];
    }
  },
  actions: {
    async fetchWeather({ commit }, { locationId, lat, lon }) {
      const API_KEY = 'a8bcd4ef1794d3d95d4ec15f5f5a15dc';
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      commit('SET_WEATHER', { locationId, weather: data });
    },
    removeWeather({ commit }, locationId) {
      commit('REMOVE_WEATHER', locationId);
    }
  },
  getters: {
    getWeatherByLocation: (state) => (locationId: number) => state.weatherByLocation[locationId]
  }
};

export default weather; 