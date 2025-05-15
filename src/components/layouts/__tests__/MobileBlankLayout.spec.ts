import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import MobileBlankLayout from '../MobileBlankLayout.vue'

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

describe('MobileBlankLayout', () => {
  it('renders properly', async () => {
    await router.push('/')
    await router.isReady()
    
    const wrapper = mount(MobileBlankLayout, {
      global: {
        plugins: [router],
        components: {
          DefaultComponent
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.mobile-blank-layout').exists()).toBe(true)
    expect(wrapper.findComponent(DefaultComponent).exists()).toBe(true)
  })

  it('renders default component when no mobile component specified', async () => {
    await router.push('/default')
    await router.isReady()
    
    const wrapper = mount(MobileBlankLayout, {
      global: {
        plugins: [router],
        components: {
          DefaultComponent
        }
      }
    })
    
    expect(wrapper.findComponent(DefaultComponent).exists()).toBe(true)
  })

  it('renders mobile component when specified in route meta', async () => {
    await router.push('/mobile')
    await router.isReady()
    
    const wrapper = mount(MobileBlankLayout, {
      global: {
        plugins: [router],
        components: {
          MobileComponent
        }
      }
    })
    
    expect(wrapper.findComponent(MobileComponent).exists()).toBe(true)
  })

  it('handles route with no matched components', async () => {
    await router.push('/non-existent')
    await router.isReady()
    
    const wrapper = mount(MobileBlankLayout, {
      global: {
        plugins: [router],
        components: {
          NotFoundComponent
        }
      }
    })
    
    // Should still render without errors and show NotFound component
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(NotFoundComponent).exists()).toBe(true)
  })

  it('has correct styling', async () => {
    await router.push('/')
    await router.isReady()
    
    const wrapper = mount(MobileBlankLayout, {
      global: {
        plugins: [router],
        components: {
          DefaultComponent
        }
      }
    })
    
    const layout = wrapper.find('.mobile-blank-layout')
    expect(layout.exists()).toBe(true)
    expect(layout.classes()).toContain('mobile-blank-layout')
  })
}) 