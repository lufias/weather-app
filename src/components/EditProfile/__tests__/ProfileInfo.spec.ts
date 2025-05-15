import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileInfo from '../ProfileInfo.vue'

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123456789'
}

describe('ProfileInfo', () => {
  it('renders user information correctly', () => {
    const wrapper = mount(ProfileInfo, {
      props: {
        user: mockUser
      }
    })

    // Check if name is rendered
    const nameElement = wrapper.find('.profile-name')
    expect(nameElement.exists()).toBe(true)
    expect(nameElement.text()).toBe(mockUser.name)

    // Check if contact info is rendered
    const contactElement = wrapper.find('.profile-contact')
    expect(contactElement.exists()).toBe(true)
    expect(contactElement.text()).toBe(`${mockUser.email} | ${mockUser.phone}`)
  })

  it('renders empty state when no user data is provided', () => {
    const wrapper = mount(ProfileInfo, {
      props: {
        user: { name: '', email: '', phone: '' }
      }
    })

    // Check if empty name is rendered
    const nameElement = wrapper.find('.profile-name')
    expect(nameElement.exists()).toBe(true)
    expect(nameElement.text()).toBe('')

    // Check if empty contact info is rendered
    const contactElement = wrapper.find('.profile-contact')
    expect(contactElement.exists()).toBe(true)
    expect(contactElement.text()).toBe('|')
  })

  it('updates display when user prop changes', async () => {
    const wrapper = mount(ProfileInfo, {
      props: {
        user: mockUser
      }
    })

    const updatedUser = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '987654321'
    }

    await wrapper.setProps({ user: updatedUser })

    // Check if name is updated
    const nameElement = wrapper.find('.profile-name')
    expect(nameElement.text()).toBe(updatedUser.name)

    // Check if contact info is updated
    const contactElement = wrapper.find('.profile-contact')
    expect(contactElement.text()).toBe(`${updatedUser.email} | ${updatedUser.phone}`)
  })
}) 