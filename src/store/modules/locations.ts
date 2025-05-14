import type { Module } from 'vuex'
import { db } from '../../db/locationDB'

export interface Location {
  city: string
  state?: string
  country: string
  lat: number
  lon: number
}

export interface LocationsState {
  locations: Location[]
}

const locations: Module<LocationsState, any> = {
  namespaced: true,
  
  state: {
    locations: []
  },

  getters: {
    getLocations: (state) => state.locations
  },

  mutations: {
    ADD_LOCATION(state, location: Location) {
      state.locations.push(location)
    },
    SET_LOCATIONS(state, locations: Location[]) {
      state.locations = locations
    }
  },

  actions: {
    async addLocation({ commit }, location: Location) {
      await db.locations.add(location)
      commit('ADD_LOCATION', location)
    },
    async loadLocations({ commit }) {
      const locations = await db.locations.toArray()
      commit('SET_LOCATIONS', locations)
    },
    async deleteLocation({ commit, state, dispatch }, locationId) {
      await db.locations.delete(locationId);
      const updated = state.locations.filter((loc: any) => loc.id !== locationId);
      commit('SET_LOCATIONS', updated);
      await dispatch('weather/removeWeather', locationId, { root: true });
    }
  }
}

export default locations 