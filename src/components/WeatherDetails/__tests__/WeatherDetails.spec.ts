import { mount, shallowMount } from '@vue/test-utils'
import { createStore, Store } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import type { Router, RouteRecordRaw } from 'vue-router'
import WeatherDetails from '../WeatherDetails.vue'
import type { Location } from '../../../store/modules/locations'
import type { CurrentWeather } from '../../../store/modules/weather'

// Mock child components
vi.mock('../WeatherDetailsHeader.vue', () => ({
  default: {
    name: 'WeatherDetailsHeader',
    template: '<div data-testid="weather-details-header"></div>',
    props: ['current-weather', 'location']
  }
}))

vi.mock('../WeatherDetailsHourly.vue', () => ({
  default: {
    name: 'WeatherDetailsHourly',
    template: '<div data-testid="weather-details-hourly"></div>'
  }
}))

vi.mock('../WeatherDetailsWeekly.vue', () => ({
  default: {
    name: 'WeatherDetailsWeekly',
    template: '<div data-testid="weather-details-weekly"></div>'
  }
}))

interface RootState {
  locations: {
    locations: Location[];
    selectedLocationId: number | null;
  };
  weather: {
    currentWeather: Record<number, CurrentWeather>;
    weatherDetails: Record<number, any>;
  };
}

describe('WeatherDetails.vue', () => {
  const mockLocation = {
    id: 1,
    lat: 51.5074,
    lon: -0.1278
  } as Location

  const mockCurrentWeather = {
    dt: Date.now() / 1000,
    temp: 20,
    feels_like: 22,
    humidity: 65,
    wind_speed: 5,
    wind_deg: 180,
    wind_gust: 7.5,
    weather: [{
      id: 800,
      main: 'Clear',
      description: 'Clear sky',
      icon: '01d'
    }],
    sunrise: Date.now() / 1000 - 21600, // 6 hours ago
    sunset: Date.now() / 1000 + 21600, // 6 hours from now
    pressure: 1015,
    dew_point: 15,
    uvi: 5,
    clouds: 0,
    visibility: 10000,
    rain: undefined,
    snow: undefined
  } as unknown as CurrentWeather

  const createVuexStore = (initialState: Partial<RootState> = {}): Store<RootState> => {
    const store = createStore<RootState>({
      modules: {
        locations: {
          namespaced: true,
          state: {
            locations: [mockLocation],
            selectedLocationId: null,
            ...(initialState.locations || {})
          },
          getters: {
            getLocations: (state) => state.locations,
            getSelectedLocationId: (state) => state.selectedLocationId
          },
          mutations: {
            setSelectedLocationId(state, id: number | null) {
              state.selectedLocationId = id
            }
          },
          actions: {
            async setSelectedLocationId({ commit }, id: number | null) {
              commit('setSelectedLocationId', id)
            }
          }
        },
        weather: {
          namespaced: true,
          state: {
            currentWeather: {},
            weatherDetails: {},
            ...(initialState.weather || {})
          },
          getters: {
            getCurrentWeather: (state) => (locationId: number) => state.currentWeather[locationId],
            getWeatherDetails: (state) => (locationId: number) => state.weatherDetails[locationId]
          },
          mutations: {
            setCurrentWeather(state, { locationId, data }) {
              state.currentWeather[locationId] = data
            },
            setWeatherDetails(state, { locationId, data }) {
              state.weatherDetails[locationId] = data
            }
          },
          actions: {
            async fetchCurrentWeather({ commit }, payload) {
              // Simulate API delay
              await new Promise(resolve => setTimeout(resolve, 0))
              commit('setCurrentWeather', { 
                locationId: payload.locationId, 
                data: mockCurrentWeather 
              })
              return mockCurrentWeather
            },
            async fetchWeatherDetails({ commit }, payload) {
              // Simulate API delay
              await new Promise(resolve => setTimeout(resolve, 0))
              const mockDetails = {
                hourly: [],
                daily: []
              }
              commit('setWeatherDetails', { 
                locationId: payload.locationId, 
                data: mockDetails 
              })
              return mockDetails
            }
          }
        }
      }
    })

    return store
  }

  const routes: RouteRecordRaw[] = [
    { 
      path: '/',
      name: 'Home',
      component: { template: '<div>Home</div>' }
    },
    {
      path: '/weather/:id',
      name: 'WeatherDetails',
      component: WeatherDetails
    }
  ]

  const router: Router = createRouter({
    history: createWebHistory(),
    routes
  })

  const createWrapper = (store: Store<RootState>) => {
    return shallowMount(WeatherDetails, {
      global: {
        plugins: [store, router],
        stubs: {
          'WeatherDetailsHeader': {
            name: 'WeatherDetailsHeader',
            template: '<div data-testid="weather-details-header"></div>',
            props: ['current-weather', 'location']
          },
          'WeatherDetailsHourly': {
            name: 'WeatherDetailsHourly',
            template: '<div data-testid="weather-details-hourly"></div>'
          },
          'WeatherDetailsWeekly': {
            name: 'WeatherDetailsWeekly',
            template: '<div data-testid="weather-details-weekly"></div>'
          }
        }
      }
    })
  }

  beforeEach(async () => {
    vi.clearAllMocks()
    await router.push('/')
    await router.isReady()
  })

  it('displays placeholder message when no location is selected', () => {
    const store = createVuexStore()
    const wrapper = createWrapper(store)
    
    expect(wrapper.find('.placeholder p').text()).toBe('Please select a city to view weather details.')
  })

  it('displays back button in placeholder on mobile view', async () => {
    const store = createVuexStore()
    const wrapper = createWrapper(store)
    
    const backButton = wrapper.find('.back-button')
    expect(backButton.exists()).toBe(true)
    expect(backButton.text()).toContain('Back to Home')
  })

  it('renders weather components when location is selected', async () => {
    const store = createVuexStore({
      locations: {
        locations: [mockLocation],
        selectedLocationId: mockLocation.id
      },
      weather: {
        currentWeather: {
          [`${mockLocation.id}`]: mockCurrentWeather
        },
        weatherDetails: {
          [`${mockLocation.id}`]: { hourly: [], daily: [] }
        }
      }
    } as Partial<RootState>)
    
    // Navigate to the weather details route first
    await router.push(`/weather/${mockLocation.id}`)
    await router.isReady()
    
    const wrapper = createWrapper(store)
    
    // Wait for all component updates to complete
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100)) // Increased timeout
    await wrapper.vm.$nextTick() // Additional nextTick to ensure all updates are processed
    
    // Verify the components are rendered
    const header = wrapper.findComponent({ name: 'WeatherDetailsHeader' })
    const hourly = wrapper.findComponent({ name: 'WeatherDetailsHourly' })
    const weekly = wrapper.findComponent({ name: 'WeatherDetailsWeekly' })
    
    expect(header.exists()).toBe(true)
    expect(hourly.exists()).toBe(true)
    expect(weekly.exists()).toBe(true)
    
    // Verify props are passed correctly
    expect(header.props()).toEqual({
      currentWeather: mockCurrentWeather,
      location: mockLocation
    })
  })

  it('fetches weather data when location is selected', async () => {
    const store = createVuexStore()
    const dispatchSpy = vi.spyOn(store, 'dispatch')
    
    // Mount component
    const wrapper = createWrapper(store)
    
    // Navigate to weather details route
    await router.push(`/weather/${mockLocation.id}`)
    await router.isReady()
    
    // Wait for component updates and async operations
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    // Verify location was selected
    expect(store.state.locations.selectedLocationId).toBe(mockLocation.id)
    
    // Verify weather data fetching
    expect(dispatchSpy).toHaveBeenCalledWith(
      'weather/fetchCurrentWeather',
      expect.objectContaining({
        locationId: mockLocation.id,
        lat: mockLocation.lat,
        lon: mockLocation.lon
      })
    )
    
    expect(dispatchSpy).toHaveBeenCalledWith(
      'weather/fetchWeatherDetails',
      expect.objectContaining({
        locationId: mockLocation.id,
        lat: mockLocation.lat,
        lon: mockLocation.lon
      })
    )

    // Wait for store updates
    await new Promise(resolve => setTimeout(resolve, 0))
    
    // Verify weather components are rendered
    expect(wrapper.findComponent({ name: 'WeatherDetailsHeader' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'WeatherDetailsHourly' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'WeatherDetailsWeekly' }).exists()).toBe(true)
  })

  it('updates selectedLocationId when route params change', async () => {
    const store = createVuexStore()
    const dispatchSpy = vi.spyOn(store, 'dispatch')
    
    await router.push('/weather/1')
    await router.isReady()
    
    createWrapper(store)
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(dispatchSpy).toHaveBeenCalledWith('locations/setSelectedLocationId', 1)
  })
}) 