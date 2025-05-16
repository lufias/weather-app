import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { Store, createStore } from 'vuex';
import WeatherDetailsHourly from '../WeatherDetailsHourly.vue';
import WeatherDetailsCard from '../WeatherDetailsCard.vue';
import type { ComponentPublicInstance } from 'vue';
import type { HourlyForecast } from '../../../store/modules/weather';

interface WeatherDetailsHourlyVM extends ComponentPublicInstance {
  hourlyForecast: HourlyForecast[];
}

// Mock route
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: {
      id: '1'
    }
  })
}));

// Mock data
const mockHourlyForecast = [
  { dt: 1625097600, temp: 20, weather: [{ icon: '01d' }] },
  { dt: 1625101200, temp: 22, weather: [{ icon: '02d' }] },
  { dt: 1625104800, temp: 24, weather: [{ icon: '03d' }] },
  { dt: 1625108400, temp: 23, weather: [{ icon: '04d' }] }
] as HourlyForecast[];

describe('WeatherDetailsHourly', () => {
  let store: Store<any>;
  let wrapper: VueWrapper<WeatherDetailsHourlyVM>;

  beforeEach(() => {
    store = createStore({
      modules: {
        weather: {
          namespaced: true,
          state: {},
          getters: {
            getHourlyForecast: () => (locationId: number) => {
              return locationId === 1 ? mockHourlyForecast : [];
            }
          }
        }
      }
    });

    wrapper = mount(WeatherDetailsHourly, {
      global: {
        plugins: [store],
        stubs: {
          WeatherDetailsCard: true
        }
      }
    }) as VueWrapper<WeatherDetailsHourlyVM>;
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the correct title', () => {
    const title = wrapper.get('[data-testid="hourly-title"]');
    expect(title.text()).toBe('Hourly Forecast');
  });

  it('renders the correct number of WeatherDetailsCard components', () => {
    const cards = wrapper.findAll('[data-testid="hourly-forecast-card"]');
    expect(cards).toHaveLength(4);
  });

  it('passes correct props to WeatherDetailsCard components', () => {
    const cards = wrapper.findAllComponents<typeof WeatherDetailsCard>(WeatherDetailsCard);
    cards.forEach((card, index) => {
      expect(card.props()).toMatchObject({
        type: 'hourly',
        data: mockHourlyForecast[index]
      });
    });
  });

  it('computes hourlyForecast correctly', () => {
    expect(wrapper.vm.hourlyForecast).toEqual(mockHourlyForecast);
  });
}); 