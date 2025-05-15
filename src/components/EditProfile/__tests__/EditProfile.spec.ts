import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EditProfile from '../EditProfile.vue'
import { createStore, Store } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'

interface UserState {
  profile: {
    avatar: string;
    [key: string]: any;
  }
}

interface RootState {
  user: UserState;
}

// Create a mock store
const createMockStore = (overrides = {}) => {
  const store = createStore<RootState>({
    modules: {
      user: {
        namespaced: true,
        state: () => ({
          profile: {
            avatar: 'test-avatar.jpg',
            // Add other user profile fields as needed
            ...overrides
          }
        }),
        getters: {
          profile: (state) => state.profile
        },
        actions: {
          loadProfile: vi.fn(),
          updateProfile: vi.fn()
        }
      }
    }
  }) as Store<RootState> & { _actions: any }
  return store
}

// Create a mock router
const createMockRouter = () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/edit-profile',
        component: EditProfile
      }
    ]
  })
  
  // Mock the back method
  router.back = vi.fn()
  
  return router
}

describe('EditProfile', () => {
  it('renders properly with initial state', () => {
    const store = createMockStore()
    const wrapper = mount(EditProfile, {
      global: {
        plugins: [store],
        stubs: {
          'ProfileAvatar': true,
          'ProfileForm': true
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.title').text()).toBe('Edit Profile')
    expect(wrapper.find('.action-btn').text()).toBe('EDIT')
  })

  it('loads profile data on mount', async () => {
    const store = createMockStore()
    const loadProfileSpy = vi.spyOn(store._actions['user/loadProfile'], '0')
    
    mount(EditProfile, {
      global: {
        plugins: [store],
        stubs: {
          'ProfileAvatar': true,
          'ProfileForm': true
        }
      }
    })

    expect(loadProfileSpy).toHaveBeenCalled()
  })

  it('toggles edit mode when clicking edit button', async () => {
    const store = createMockStore()
    const wrapper = mount(EditProfile, {
      global: {
        plugins: [store],
        stubs: {
          'ProfileAvatar': true,
          'ProfileForm': true
        }
      }
    })

    const button = wrapper.find('.action-btn')
    expect(button.text()).toBe('EDIT')

    await button.trigger('click')
    expect(button.text()).toBe('SUBMIT')

    // Check that ProfileAvatar and ProfileForm received correct props
    const avatar = wrapper.findComponent({ name: 'ProfileAvatar' })
    const form = wrapper.findComponent({ name: 'ProfileForm' })
    expect(avatar.props('editable')).toBe(true)
    expect(form.props('disabled')).toBe(false)
  })

  it('handles avatar updates in edit mode', async () => {
    const store = createMockStore()
    const updateProfileSpy = vi.spyOn(store._actions['user/updateProfile'], '0')
    const wrapper = mount(EditProfile, {
      global: {
        plugins: [store],
        stubs: {
          'ProfileAvatar': true,
          'ProfileForm': true
        }
      }
    })

    // Enter edit mode
    await wrapper.find('.action-btn').trigger('click')

    // Simulate avatar update
    const avatar = wrapper.findComponent({ name: 'ProfileAvatar' })
    await avatar.vm.$emit('update:avatar', 'new-avatar-base64')

    expect(updateProfileSpy).toHaveBeenCalledWith({ avatar: 'new-avatar-base64' })
  })

  it('does not handle avatar updates when not in edit mode', async () => {
    const store = createMockStore()
    const updateProfileSpy = vi.spyOn(store._actions['user/updateProfile'], '0')
    const wrapper = mount(EditProfile, {
      global: {
        plugins: [store],
        stubs: {
          'ProfileAvatar': true,
          'ProfileForm': true
        }
      }
    })

    // Simulate avatar update without entering edit mode
    const avatar = wrapper.findComponent({ name: 'ProfileAvatar' })
    await avatar.vm.$emit('update:avatar', 'new-avatar-base64')

    expect(updateProfileSpy).not.toHaveBeenCalled()
  })

  it('handles form submission', async () => {
    const store = createMockStore()
    const wrapper = mount(EditProfile, {
      global: {
        plugins: [store],
        stubs: {
          'ProfileAvatar': true,
          'ProfileForm': true
        }
      }
    })

    // Enter edit mode
    await wrapper.find('.action-btn').trigger('click')
    expect(wrapper.find('.action-btn').text()).toBe('SUBMIT')

    // Simulate form submission
    const form = wrapper.findComponent({ name: 'ProfileForm' })
    await form.vm.$emit('submit')

    // Check that edit mode is turned off
    expect(wrapper.find('.action-btn').text()).toBe('EDIT')
  })

  it('handles back navigation', async () => {
    const router = createMockRouter()
    const store = createMockStore()
    
    const wrapper = mount(EditProfile, {
      global: {
        plugins: [store, router],
        stubs: {
          'ProfileAvatar': true,
          'ProfileForm': true
        }
      }
    })

    await wrapper.find('.back-btn').trigger('click')
    expect(router.back).toHaveBeenCalled()
  })
}) 