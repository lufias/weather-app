import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import WeatherDetailsCard from '../WeatherDetailsCard.vue';
import type { HourlyForecast, DailyForecast } from '../../../store/modules/weather';

const mockHourlyData: HourlyForecast = {
  dt: 1648226400,
  temp: 20,
  feels_like: 19,
  pressure: 1015,
  humidity: 75,
  dew_point: 15,
  uvi: 2,
  clouds: 20,
  visibility: 10000,
  wind_speed: 3.5,
  wind_deg: 180,
  wind_gust: 5,
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  pop: 0
};

const mockWeeklyData: DailyForecast = {
  dt: 1648226400,
  sunrise: 1648206000,
  sunset: 1648249200,
  moonrise: 1648214400,
  moonset: 1648260800,
  moon_phase: 0.5,
  summary: 'Clear day',
  temp: {
    day: 22,
    min: 15,
    max: 25,
    night: 18,
    eve: 20,
    morn: 16
  },
  feels_like: {
    day: 21,
    night: 17,
    eve: 19,
    morn: 15
  },
  pressure: 1015,
  humidity: 65,
  dew_point: 14,
  wind_speed: 4,
  wind_deg: 190,
  wind_gust: 6,
  weather: [
    {
      id: 802,
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03d'
    }
  ],
  clouds: 30,
  pop: 0.1,
  uvi: 4
};

describe('WeatherDetailsCard.vue', () => {
  describe('Hourly View', () => {
    const wrapper = mount(WeatherDetailsCard, {
      props: {
        type: 'hourly',
        data: mockHourlyData
      }
    });

    it('renders hourly view correctly', () => {
      expect(wrapper.find('[data-testid="weather-card"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="hourly-temp"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="hourly-time"]').exists()).toBe(true);
    });

    it('displays correct temperature', () => {
      expect(wrapper.find('[data-testid="hourly-temp"]').text()).toBe('20°');
    });

    it('displays weather icon', () => {
      const icon = wrapper.find('[data-testid="weather-icon"]');
      expect(icon.exists()).toBe(true);
      expect(icon.attributes('src')).toBe('https://openweathermap.org/img/wn/01d@2x.png');
    });
  });

  describe('Weekly View', () => {
    const wrapper = mount(WeatherDetailsCard, {
      props: {
        type: 'weekly',
        data: mockWeeklyData
      }
    });

    it('renders weekly view correctly', () => {
      expect(wrapper.find('[data-testid="weather-card"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="weekly-day"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="weekly-temp"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="weather-description"]').exists()).toBe(true);
    });

    it('displays correct temperature', () => {
      expect(wrapper.find('[data-testid="weekly-temp"]').text()).toBe('25º C');
    });

    it('displays correct weather description', () => {
      expect(wrapper.find('[data-testid="weather-description"]').text()).toBe('Clouds');
    });

    it('displays weather icon', () => {
      const icon = wrapper.find('[data-testid="weather-icon"]');
      expect(icon.exists()).toBe(true);
      expect(icon.attributes('src')).toBe('https://openweathermap.org/img/wn/03d@2x.png');
    });
  });
}); 