import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import WeatherDetailsHeader from '../WeatherDetailsHeader.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import type { CurrentWeather } from '../../../store/modules/weather';
import type { Location } from '../../../store/modules/locations';

// Mock child component
vi.mock('../WeatherDetailsMeta.vue', () => ({
  default: {
    name: 'WeatherDetailsMeta',
    template: '<div data-testid="weather-details-meta"></div>'
  }
}));

describe('WeatherDetailsHeader', () => {
  const mockCurrentWeather: CurrentWeather = {
    dt: 1647356400, // March 15, 2022
    temp: 20.5,
    feels_like: 19.5,
    pressure: 1015,
    humidity: 65,
    wind_speed: 5.2,
    wind_deg: 180,
    wind_gust: 7.5,
    dew_point: 12.5,
    clouds: 0,
    sunrise: 1647320400,
    sunset: 1647363600,
    uvi: 4.5,
    visibility: 10000,
    weather: [{
      icon: '01d',
      description: 'clear sky',
      main: 'Clear',
      id: 800
    }]
  };

  const mockLocation: Location = {
    id: 1,
    city: 'London',
    country: 'GB',
    lat: 51.5074,
    lon: -0.1278
  };

  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: {} }]
  });

  const mockStore = {
    modules: {
      locations: {
        namespaced: true,
        state: {},
        actions: {
          deleteLocation: vi.fn()
        }
      },
      weather: {
        namespaced: true,
        state: {},
        actions: {
          fetchCurrentWeather: vi.fn(),
          fetchWeatherDetails: vi.fn()
        }
      }
    }
  };

  const store = createStore(mockStore);

  let wrapper: VueWrapper;

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    wrapper = mount(WeatherDetailsHeader, {
      props: {
        currentWeather: mockCurrentWeather,
        location: mockLocation
      },
      global: {
        plugins: [router, store],
        mocks: {
          $store: store
        }
      }
    });
  });

  it('renders the component correctly', () => {
    expect(wrapper.find('[data-testid="weather-details-header"]').exists()).toBe(true);
  });

  it('displays the correct location name', () => {
    expect(wrapper.find('[data-testid="location-name"]').text()).toBe('London');
  });

  it('displays the correct temperature', () => {
    expect(wrapper.find('[data-testid="weather-temp"]').text()).toBe('21° C');
  });

  it('displays the correct weather description', () => {
    expect(wrapper.find('[data-testid="weather-description"]').text()).toBe('clear sky');
  });

  it('displays the correct date format', () => {
    expect(wrapper.find('[data-testid="weather-date"]').text()).toMatch(/Tuesday, March 15, 2022/);
  });

  it('navigates back when back button is clicked', async () => {
    const routerPushSpy = vi.spyOn(router, 'push');
    await wrapper.find('[data-testid="back-button"]').trigger('click');
    expect(routerPushSpy).toHaveBeenCalledWith('/');
  });

  it('deletes location when delete button is clicked', async () => {
    await wrapper.find('[data-testid="delete-button"]').trigger('click');
    expect(mockStore.modules.locations.actions.deleteLocation).toHaveBeenCalledWith(
      expect.anything(),
      1
    );
  });

  it('refreshes weather data when refresh event is emitted from meta component', async () => {
    await wrapper.findComponent({ name: 'WeatherDetailsMeta' }).vm.$emit('refresh');
    
    expect(mockStore.modules.weather.actions.fetchCurrentWeather).toHaveBeenCalledWith(
      expect.anything(),
      {
        locationId: 1,
        lat: 51.5074,
        lon: -0.1278
      }
    );
    expect(mockStore.modules.weather.actions.fetchWeatherDetails).toHaveBeenCalledWith(
      expect.anything(),
      {
        locationId: 1,
        lat: 51.5074,
        lon: -0.1278
      }
    );
  });
}); 