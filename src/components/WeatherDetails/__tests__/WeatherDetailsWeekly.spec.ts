import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { Store, createStore } from 'vuex';
import WeatherDetailsWeekly from '../WeatherDetailsWeekly.vue';
import WeatherDetailsCard from '../WeatherDetailsCard.vue';
import type { ComponentPublicInstance } from 'vue';
import type { DailyForecast } from '../../../store/modules/weather';

interface WeatherDetailsWeeklyVM extends ComponentPublicInstance {
  dailyForecast: DailyForecast[];
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
const mockDailyForecast = [
  { dt: 1625097600, temp: { day: 20, min: 15, max: 25 }, weather: [{ icon: '01d' }] },
  { dt: 1625184000, temp: { day: 22, min: 16, max: 27 }, weather: [{ icon: '02d' }] },
  { dt: 1625270400, temp: { day: 24, min: 18, max: 29 }, weather: [{ icon: '03d' }] },
  { dt: 1625356800, temp: { day: 23, min: 17, max: 28 }, weather: [{ icon: '04d' }] },
  { dt: 1625443200, temp: { day: 21, min: 16, max: 26 }, weather: [{ icon: '01d' }] },
  { dt: 1625529600, temp: { day: 20, min: 15, max: 25 }, weather: [{ icon: '02d' }] },
  { dt: 1625616000, temp: { day: 19, min: 14, max: 24 }, weather: [{ icon: '03d' }] }
] as DailyForecast[];

describe('WeatherDetailsWeekly', () => {
  let store: Store<any>;
  let wrapper: VueWrapper<WeatherDetailsWeeklyVM>;

  beforeEach(() => {
    store = createStore({
      modules: {
        weather: {
          namespaced: true,
          state: {},
          getters: {
            getDailyForecast: () => (locationId: number) => {
              return locationId === 1 ? mockDailyForecast : [];
            }
          }
        }
      }
    });

    wrapper = mount(WeatherDetailsWeekly, {
      global: {
        plugins: [store],
        stubs: {
          WeatherDetailsCard: true
        }
      }
    }) as VueWrapper<WeatherDetailsWeeklyVM>;
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the correct title', () => {
    const title = wrapper.get('.weekly-title');
    expect(title.text()).toBe('Weekly Forecast');
  });

  it('renders the correct number of WeatherDetailsCard components', () => {
    const cards = wrapper.findAllComponents(WeatherDetailsCard);
    expect(cards).toHaveLength(7); // Should show 7 days of forecast
  });

  it('passes correct props to WeatherDetailsCard components', () => {
    const cards = wrapper.findAllComponents<typeof WeatherDetailsCard>(WeatherDetailsCard);
    cards.forEach((card, index) => {
      expect(card.props()).toMatchObject({
        type: 'weekly',
        data: mockDailyForecast[index]
      });
    });
  });

  it('computes dailyForecast correctly', () => {
    expect(wrapper.vm.dailyForecast).toEqual(mockDailyForecast);
  });
}); 