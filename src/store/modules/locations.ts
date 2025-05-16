import type { Module } from 'vuex'
import { db } from '../../db/locationDB'

export interface Location {
  id?: number;
  city: string
  state?: string
  country: string
  lat: number
  lon: number
}

export interface LocationsState {
  locations: Location[]
  selectedLocationId: number | null
}

const locations: Module<LocationsState, any> = {
  namespaced: true,
  
  state: {
    locations: [],
    selectedLocationId: null
  },

  getters: {
    getLocations: (state) => state.locations,
    getSelectedLocationId: (state) => state.selectedLocationId
  },

  mutations: {
    ADD_LOCATION(state, location: Location) {
      state.locations.unshift(location)
    },
    SET_LOCATIONS(state, locations: Location[]) {
      state.locations = locations.slice().reverse();
    },
    REMOVE_ALL_LOCATIONS(state) {
      state.locations = [];
    },
    SET_SELECTED_LOCATION_ID(state, locationId: number | null) {
      state.selectedLocationId = locationId;
    }
  },

  actions: {
    async addLocation({ commit, dispatch, state }, location: Location) {
      try {
        const existing = state.locations.find(
          (loc: Location) => loc.lat === location.lat && loc.lon === location.lon
        );
        if (existing) return { status: 'duplicate' };
        
        const id = await db.locations.add(location);
        const newLoc = { ...location, id };
        commit('ADD_LOCATION', newLoc);
        
        try {
          await dispatch('weather/fetchCurrentWeather', {
            locationId: id,
            lat: location.lat,
            lon: location.lon
          }, { root: true });
        } catch (error) {
          console.error('Error fetching weather for new location:', error);
          // Remove the location if weather fetch fails
          await db.locations.delete(id);
          commit('REMOVE_ALL_LOCATIONS');
          await dispatch('loadLocations');
          throw error;
        }
        
        return { status: 'success' };
      } catch (error) {
        console.error('Error adding location:', error);
        throw error;
      }
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
    },
    async removeAllLocations({ commit, state, dispatch }) {
      await db.locations.clear();
      for (const loc of state.locations) {
        if (loc.id !== undefined) {
          await dispatch('weather/removeWeather', loc.id, { root: true });
        }
      }
      commit('REMOVE_ALL_LOCATIONS');
      commit('SET_SELECTED_LOCATION_ID', null);
    },
    setSelectedLocationId({ commit }, locationId: number | null) {
      commit('SET_SELECTED_LOCATION_ID', locationId);
    }
  }
}

export default locations 