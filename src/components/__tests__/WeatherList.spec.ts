import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherList from '../WeatherList.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'

// Mock the window.innerWidth
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024
})

// Mock store
const createMockStore = () => {
  const store: any = createStore({
    modules: {
      locations: {
        namespaced: true,
        state: {
          locations: [
            { id: 1, city: 'London', lat: 51.5074, lon: -0.1278, isCurrentLocation: false },
            { id: 2, city: 'Paris', lat: 48.8566, lon: 2.3522, isCurrentLocation: false }
          ]
        },
        getters: {
          getLocations: (state) => state.locations
        },
        actions: {
          loadLocations: vi.fn(),
          removeAllLocations: vi.fn()
        }
      },
      weather: {
        namespaced: true,
        getters: {
          getCurrentWeather: () => (id: number) => ({
            temp: 20,
            weather: [{ description: 'Sunny', icon: '01d' }],
            dt: 1234567890
          })
        },
        actions: {
          fetchCurrentWeather: vi.fn()
        }
      }
    }
  });
  store.dispatch = vi.fn();
  return store;
}

// Mock router
const createMockRouter = () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: { template: '<div>Home</div>' }
      },
      {
        path: '/details/:id',
        name: 'details',
        component: { template: '<div>Details</div>' }
      }
    ]
  })

  // Mock push
  router.push = vi.fn()
  return router
}

describe('WeatherList.vue', () => {
  let wrapper: any;
  let store: any;
  let router: any;

  beforeEach(() => {
    // Always set window.innerWidth to desktop before each test
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
    store = createMockStore() as any
    router = createMockRouter() as any
    wrapper = mount(WeatherList, {
      global: {
        plugins: [store, router],
        stubs: {
          WeatherCard: true,
          SearchContainer: true
        }
      }
    })
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays weather cards for each location', () => {
    const weatherCards = wrapper.findAllComponents({ name: 'WeatherCard' })
    expect(weatherCards).toHaveLength(2)
  })

  it('shows placeholder when no locations exist', async () => {
    // Create a new store with empty locations and spy on dispatch
    const emptyStore: any = createStore({
      modules: {
        locations: {
          namespaced: true,
          state: {
            locations: []
          },
          getters: {
            getLocations: (state) => state.locations
          },
          actions: {
            loadLocations: vi.fn(),
            removeAllLocations: vi.fn()
          }
        },
        weather: {
          namespaced: true,
          getters: {
            getCurrentWeather: () => () => null
          },
          actions: {
            fetchCurrentWeather: vi.fn()
          }
        }
      }
    });
    emptyStore.dispatch = vi.fn();
    const emptyRouterAny = createMockRouter() as any;
    const emptyWrapper = mount(WeatherList, {
      global: {
        plugins: [emptyStore, emptyRouterAny],
        stubs: {
          WeatherCard: true,
          SearchContainer: true
        }
      }
    })
    const placeholder = emptyWrapper.find('.weather-list-placeholder')
    expect(placeholder.exists()).toBe(true)
    expect(placeholder.text()).toContain('No locations added yet')
  })

  it('calls removeAllLocations when remove all button is clicked', async () => {
    const removeButton = wrapper.find('.remove-all-btn')
    await removeButton.trigger('click')
    expect(store.dispatch).toHaveBeenCalledWith('locations/removeAllLocations')
  })

  it('navigates to details page when weather card is clicked', async () => {
    const weatherCard = wrapper.find('.weather-list-item')
    await weatherCard.trigger('click')
    expect(router.push).toHaveBeenCalledWith({
      name: 'details',
      params: { id: '1' }
    })
  })

  it('loads locations and fetches weather data on mount', () => {
    expect(store.dispatch).toHaveBeenCalledWith('locations/loadLocations')
    expect(store.dispatch).toHaveBeenCalledWith('weather/fetchCurrentWeather', {
      locationId: 1,
      lat: 51.5074,
      lon: -0.1278
    })
  })

  it('applies mobile class when window width is less than 768px', async () => {
    // Set window width to mobile size before mounting
    Object.defineProperty(window, 'innerWidth', { value: 500, writable: true })
    const mobileStore: any = createMockStore()
    const mobileRouter: any = createMockRouter()
    const mobileWrapper = mount(WeatherList, {
      global: {
        plugins: [mobileStore, mobileRouter],
        stubs: {
          WeatherCard: true,
          SearchContainer: true
        }
      }
    })
    await mobileWrapper.vm.$nextTick()
    expect(mobileWrapper.classes()).toContain('mobile')
  })
}) 