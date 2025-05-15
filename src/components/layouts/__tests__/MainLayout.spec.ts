import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../MainLayout.vue'
import Header from '../Header.vue'
import ContentCard from '../ContentCard.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: {} },
    { path: '/edit-profile', name: 'EditProfile', component: {} }
  ]
})

// Create a stub for RouterView
const RouterViewStub = {
  name: 'RouterView',
  template: '<div data-testid="main-router-view">Router View Stub</div>'
}

describe('MainLayout', () => {
  it('renders properly', () => {
    const wrapper = mount(MainLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          ContentCard,
          FontAwesomeIcon
        },
        stubs: {
          RouterView: RouterViewStub
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-testid="main-layout"]').exists()).toBe(true)
  })

  it('contains Header component', () => {
    const wrapper = mount(MainLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          ContentCard,
          FontAwesomeIcon
        },
        stubs: {
          RouterView: RouterViewStub
        }
      }
    })
    expect(wrapper.findComponent(Header).exists()).toBe(true)
  })

  it('contains ContentCard component', () => {
    const wrapper = mount(MainLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          ContentCard,
          FontAwesomeIcon
        },
        stubs: {
          RouterView: RouterViewStub
        }
      }
    })
    expect(wrapper.findComponent(ContentCard).exists()).toBe(true)
  })

  it('has proper layout structure', () => {
    const wrapper = mount(MainLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          ContentCard,
          FontAwesomeIcon
        },
        stubs: {
          RouterView: RouterViewStub
        }
      }
    })
    expect(wrapper.find('[data-testid="main-layout"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="main-content"]').exists()).toBe(true)
  })

  it('contains router-view inside ContentCard', () => {
    const wrapper = mount(MainLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          ContentCard,
          FontAwesomeIcon
        },
        stubs: {
          RouterView: RouterViewStub
        }
      }
    })

    // Verify both ContentCard and router-view exist
    expect(wrapper.findComponent(ContentCard).exists()).toBe(true)
    expect(wrapper.find('[data-testid="main-router-view"]').exists()).toBe(true)

    // Verify router-view is inside ContentCard by checking DOM structure
    const routerView = wrapper.find('[data-testid="main-router-view"]')
    const contentCard = wrapper.findComponent(ContentCard)
    expect(contentCard.element.contains(routerView.element)).toBe(true)
  })
}) 