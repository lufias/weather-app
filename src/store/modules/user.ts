import type { Module } from 'vuex';
import type { RootState } from '../index';
import { userDB } from '../../db/userDB';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface UserState {
  profile: UserProfile;
  profileId?: number;
}

const userModule: Module<UserState, RootState> = {
  namespaced: true,
  
  state: () => ({
    profile: {
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      phone: '+01 234 567 89',
      avatar: ''
    },
    profileId: undefined
  }),

  mutations: {
    UPDATE_PROFILE(state, payload: { profile: UserProfile; id?: number }) {
      state.profile = { ...state.profile, ...payload.profile };
      if (payload.id !== undefined) {
        state.profileId = payload.id;
      }
    }
  },

  actions: {
    async loadProfile({ commit }) {
      try {
        // Get the first profile (we only store one)
        const profile = await userDB.profile.toArray();
        if (profile.length > 0) {
          const { id, ...profileData } = profile[0];
          commit('UPDATE_PROFILE', { profile: profileData, id });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    },

    async updateProfile({ commit, state }, payload: Partial<UserProfile>) {
      try {
        const updatedProfile = { ...state.profile, ...payload };
        
        if (state.profileId === undefined) {
          // Create new profile
          const id = await userDB.profile.add(updatedProfile);
          commit('UPDATE_PROFILE', { profile: updatedProfile, id });
        } else {
          // Update existing profile
          await userDB.profile.update(state.profileId, updatedProfile);
          commit('UPDATE_PROFILE', { profile: updatedProfile });
        }
        
        return true;
      } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
    }
  },

  getters: {
    profile: (state) => state.profile
  }
};

export default userModule; 