import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import MobileLayout from '../MobileLayout.vue'
import Header from '../Header.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Mock components
const DefaultComponent = {
  name: 'DefaultComponent',
  template: '<div class="default-component">Default Content</div>'
}

const MobileComponent = {
  name: 'MobileComponent',
  template: '<div class="mobile-component">Mobile Content</div>'
}

const NotFoundComponent = {
  name: 'NotFoundComponent',
  template: '<div>Not Found</div>'
}

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DefaultComponent
    },
    {
      path: '/default',
      component: DefaultComponent
    },
    {
      path: '/mobile',
      component: DefaultComponent,
      meta: {
        mobileComponent: MobileComponent
      }
    },
    {
      path: '/edit-profile',
      name: 'EditProfile',
      component: {}
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundComponent
    }
  ]
})

// Setup router
router.push('/') // Set initial route

describe('MobileLayout', () => {
  it('renders properly', async () => {
    const wrapper = mount(MobileLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          FontAwesomeIcon
        }
      }
    })
    await router.isReady()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.mobile-layout').exists()).toBe(true)
  })

  it('contains Header component', async () => {
    const wrapper = mount(MobileLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          FontAwesomeIcon
        }
      }
    })
    await router.isReady()
    expect(wrapper.findComponent(Header).exists()).toBe(true)
  })

  it('renders default component when no mobile component specified', async () => {
    await router.push('/default')
    await router.isReady()
    
    const wrapper = mount(MobileLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          DefaultComponent,
          FontAwesomeIcon
        }
      }
    })
    
    expect(wrapper.findComponent(DefaultComponent).exists()).toBe(true)
  })

  it('renders mobile component when specified in route meta', async () => {
    await router.push('/mobile')
    await router.isReady()
    
    const wrapper = mount(MobileLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          MobileComponent,
          FontAwesomeIcon
        }
      }
    })
    
    expect(wrapper.findComponent(MobileComponent).exists()).toBe(true)
  })

  it('handles route with no matched components', async () => {
    await router.push('/non-existent')
    await router.isReady()
    
    const wrapper = mount(MobileLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          FontAwesomeIcon,
          NotFoundComponent
        }
      }
    })
    
    // Should still render without errors and show NotFound component
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(NotFoundComponent).exists()).toBe(true)
  })
}) 