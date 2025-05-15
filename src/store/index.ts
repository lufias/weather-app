import { createStore } from 'vuex'
import locations from './modules/locations'
import weather from './modules/weather'
import user from './modules/user'

export interface RootState {
  // Add root state properties here if needed
}

export default createStore<RootState>({
  modules: {
    locations,
    weather,
    user
  }
}) 