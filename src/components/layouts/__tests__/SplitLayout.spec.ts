import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import SplitLayout from '../SplitLayout.vue'
import Header from '../Header.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Mock components for named views
const LeftComponent = {
  template: '<div class="left-component">Left Content</div>'
}
const RightComponent = {
  template: '<div class="right-component">Right Content</div>'
}

// Create RouterView stubs for left and right views
const RouterViewStub = {
  name: 'RouterView',
  template: '<div :data-testid="$attrs.name === \'left\' ? \'router-view-left\' : \'router-view-right\'">Router View {{$attrs.name}}</div>'
}

// Create a mock router with named views
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        left: LeftComponent,
        right: RightComponent
      }
    },
    {
      path: '/edit-profile',
      name: 'EditProfile',
      component: {}
    }
  ]
})

describe('SplitLayout', () => {
  it('renders properly', () => {
    const wrapper = mount(SplitLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          FontAwesomeIcon
        },
        stubs: {
          RouterView: RouterViewStub
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-testid="split-layout"]').exists()).toBe(true)
  })

  it('contains Header component', () => {
    const wrapper = mount(SplitLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          FontAwesomeIcon
        },
        stubs: {
          RouterView: RouterViewStub
        }
      }
    })
    expect(wrapper.findComponent(Header).exists()).toBe(true)
  })

  it('has correct layout structure', () => {
    const wrapper = mount(SplitLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          FontAwesomeIcon
        },
        stubs: {
          RouterView: RouterViewStub
        }
      }
    })
    
    expect(wrapper.find('[data-testid="split-layout-content"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="split-layout-left"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="split-layout-right"]').exists()).toBe(true)
  })

  it('renders named router views', () => {
    const wrapper = mount(SplitLayout, {
      global: {
        plugins: [router],
        components: {
          Header,
          FontAwesomeIcon
        },
        stubs: {
          RouterView: RouterViewStub
        }
      }
    })
    
    expect(wrapper.find('[data-testid="router-view-left"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="router-view-right"]').exists()).toBe(true)
  })
}) 