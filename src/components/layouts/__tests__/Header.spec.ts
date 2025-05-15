import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Header from '../Header.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: {} },
    { path: '/edit-profile', name: 'EditProfile', component: {} }
  ]
})

describe('Header', () => {
  it('renders properly', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router],
        components: {
          FontAwesomeIcon
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.header').exists()).toBe(true)
  })

  it('contains the Weather title', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router],
        components: {
          FontAwesomeIcon
        }
      }
    })
    expect(wrapper.find('.title').text()).toBe('Weather')
  })

  it('has working navigation links', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router],
        components: {
          FontAwesomeIcon
        }
      }
    })
    
    // Check home link
    const homeLink = wrapper.find('.title-link')
    expect(homeLink.attributes('href')).toBe('/')

    // Check profile links
    const profileLinks = wrapper.findAll('[aria-label="Edit Profile"]')
    expect(profileLinks.length).toBe(2) // One for desktop, one for mobile
    profileLinks.forEach(link => {
      expect(link.attributes('href')).toBe('/edit-profile')
    })
  })

  it('has correct responsive classes', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router],
        components: {
          FontAwesomeIcon
        }
      }
    })
    
    expect(wrapper.find('.profile-icon-desktop').exists()).toBe(true)
    expect(wrapper.find('.profile-icon-mobile').exists()).toBe(true)
  })

  it('renders FontAwesome icons', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router],
        components: {
          FontAwesomeIcon
        }
      }
    })
    
    const icons = wrapper.findAllComponents(FontAwesomeIcon)
    expect(icons.length).toBe(2) // One for desktop, one for mobile
  })
}) 