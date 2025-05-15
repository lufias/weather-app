import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileForm from '../ProfileForm.vue'
import { createStore, Store } from 'vuex'
import type { UserProfile } from '../../../store/modules/user'

interface RootState {
  user: {
    profile: UserProfile;
  }
}

const mockUser: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123456789',
  avatar: 'test-avatar.jpg'
}

const createMockStore = (mockActions?: any) => {
  const store = createStore<RootState>({
    modules: {
      user: {
        namespaced: true,
        state: () => ({
          profile: { ...mockUser }
        }),
        actions: {
          updateProfile: mockActions?.updateProfile || vi.fn().mockResolvedValue(undefined)
        }
      }
    }
  }) as Store<RootState> & { _actions: any }
  return store
}

describe('ProfileForm', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders form fields with user data', () => {
    const wrapper = mount(ProfileForm, {
      props: {
        user: mockUser
      },
      global: {
        plugins: [createMockStore()]
      }
    })

    // Check if all form fields are rendered
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('.phone-input').exists()).toBe(true)

    // Check if values are correctly populated
    const nameInput = wrapper.find('input[type="text"]').element as HTMLInputElement
    const emailInput = wrapper.find('input[type="email"]').element as HTMLInputElement
    const phoneInput = wrapper.find('.phone-input').element as HTMLInputElement

    expect(nameInput.value).toBe(mockUser.name)
    expect(emailInput.value).toBe(mockUser.email)
    expect(phoneInput.value).toBe(mockUser.phone)
  })

  it('disables form fields when disabled prop is true', () => {
    const wrapper = mount(ProfileForm, {
      props: {
        user: mockUser,
        disabled: true
      },
      global: {
        plugins: [createMockStore()]
      }
    })

    const inputs = wrapper.findAll('input')
    inputs.forEach(input => {
      expect(input.element.disabled).toBe(true)
    })
  })

  it('enables form fields when disabled prop is false', () => {
    const wrapper = mount(ProfileForm, {
      props: {
        user: mockUser,
        disabled: false
      },
      global: {
        plugins: [createMockStore()]
      }
    })

    const inputs = wrapper.findAll('input')
    inputs.forEach(input => {
      expect(input.element.disabled).toBe(false)
    })
  })

  it('updates form data when user prop changes', async () => {
    const wrapper = mount(ProfileForm, {
      props: {
        user: mockUser
      },
      global: {
        plugins: [createMockStore()]
      }
    })

    const updatedUser = {
      ...mockUser,
      name: 'Jane Doe',
      email: 'jane@example.com'
    }

    await wrapper.setProps({ user: updatedUser })

    const nameInput = wrapper.find('input[type="text"]').element as HTMLInputElement
    const emailInput = wrapper.find('input[type="email"]').element as HTMLInputElement

    expect(nameInput.value).toBe(updatedUser.name)
    expect(emailInput.value).toBe(updatedUser.email)
  })

  it('handles form submission when enabled', async () => {
    let resolveFn: () => void
    const actionPromise = new Promise<void>(resolve => {
      resolveFn = resolve
    })

    const updateProfileMock = vi.fn().mockImplementation(() => actionPromise)
    const store = createMockStore({
      updateProfile: updateProfileMock
    })
    
    const wrapper = mount(ProfileForm, {
      props: {
        user: mockUser,
        disabled: false
      },
      global: {
        plugins: [store]
      }
    })

    // Modify form data
    const nameInput = wrapper.find('input[type="text"]')
    await nameInput.setValue('Jane Doe')

    // Submit form
    const submitPromise = wrapper.find('form').trigger('submit')
    
    // Resolve the store action
    resolveFn!()
    
    // Wait for all promises to resolve
    await submitPromise
    await vi.runAllTimersAsync()

    // Check if store action was called with updated data
    expect(updateProfileMock).toHaveBeenCalledTimes(1)
    expect(updateProfileMock.mock.calls[0][1]).toEqual({
      ...mockUser,
      name: 'Jane Doe'
    })

    // Check if submit event was emitted
    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('does not submit form when disabled', async () => {
    const store = createMockStore()
    const updateProfileSpy = vi.spyOn(store._actions['user/updateProfile'], '0')
    
    const wrapper = mount(ProfileForm, {
      props: {
        user: mockUser,
        disabled: true
      },
      global: {
        plugins: [store]
      }
    })

    // Try to submit form
    await wrapper.find('form').trigger('submit')

    // Check that no action was called and no event was emitted
    expect(updateProfileSpy).not.toHaveBeenCalled()
    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  it('handles form submission error gracefully', async () => {
    const error = new Error('Update failed')
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    let rejectFn: (error: Error) => void

    // Create store with failing action that we can control
    const store = createMockStore({
      updateProfile: () => new Promise((_, reject) => {
        rejectFn = reject
      })
    })
    
    const wrapper = mount(ProfileForm, {
      props: {
        user: mockUser,
        disabled: false
      },
      global: {
        plugins: [store]
      }
    })

    // Submit form
    const submitPromise = wrapper.find('form').trigger('submit')
    
    // Reject the promise
    rejectFn!(error)
    
    // Wait for the rejection to be handled
    await submitPromise.catch(() => {})
    await vi.runAllTimersAsync()

    // Check if error was logged
    expect(consoleSpy).toHaveBeenCalledWith('Error updating profile:', error)
    
    // Check that submit event was not emitted due to error
    expect(wrapper.emitted('submit')).toBeFalsy()
    
    consoleSpy.mockRestore()
  })

  it('updates v-model values correctly', async () => {
    const wrapper = mount(ProfileForm, {
      props: {
        user: mockUser,
        disabled: false
      },
      global: {
        plugins: [createMockStore()]
      }
    })

    // Test each input field
    const updates = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '987654321'
    }

    await wrapper.find('input[type="text"]').setValue(updates.name)
    await wrapper.find('input[type="email"]').setValue(updates.email)
    await wrapper.find('.phone-input').setValue(updates.phone)

    // Check if v-model updated the internal state
    const formData = (wrapper.vm as any).formData
    expect(formData.name).toBe(updates.name)
    expect(formData.email).toBe(updates.email)
    expect(formData.phone).toBe(updates.phone)
  })
}) 