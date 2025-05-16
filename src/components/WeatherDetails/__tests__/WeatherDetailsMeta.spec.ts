import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherDetailsMeta from '../WeatherDetailsMeta.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Mock data
const mockCurrentWeather = {
  dt: 1648338000, // Example timestamp
  sunrise: 1648318800,
  sunset: 1648363200,
  temp: 20,
  feels_like: 18,
  pressure: 1015,
  humidity: 65,
  dew_point: 15,
  uvi: 5,
  clouds: 40,
  visibility: 10000,
  wind_speed: 5,
  wind_deg: 180,
  wind_gust: 7,
  weather: [{
    id: 800,
    main: 'Clear',
    description: 'clear sky',
    icon: '01d'
  }]
};

describe('WeatherDetailsMeta', () => {
  it('renders last update time correctly', () => {
    const wrapper = mount(WeatherDetailsMeta, {
      props: {
        currentWeather: mockCurrentWeather
      },
      global: {
        components: {
          FontAwesomeIcon
        }
      }
    })

    expect(wrapper.find('.meta-update').exists()).toBe(true)
    expect(wrapper.find('.meta-update').text()).toContain('Last Update')
  })

  it('emits refresh event when refresh icon is clicked', async () => {
    const wrapper = mount(WeatherDetailsMeta, {
      props: {
        currentWeather: mockCurrentWeather
      },
      global: {
        components: {
          FontAwesomeIcon
        }
      }
    })

    await wrapper.find('.meta-refresh').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('refresh')
    expect(wrapper.emitted('refresh')).toHaveLength(1)
  })

  it('formats time correctly', () => {
    const wrapper = mount(WeatherDetailsMeta, {
      props: {
        currentWeather: mockCurrentWeather
      },
      global: {
        components: {
          FontAwesomeIcon
        }
      }
    })

    // The exact expected time will depend on the timezone where the test runs
    // We'll check for the basic format instead
    const updateText = wrapper.find('.meta-update').text()
    expect(updateText).toMatch(/Last Update \d{1,2}:\d{2} [AP]M/)
  })
}) 