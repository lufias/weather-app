import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContentCard from '../ContentCard.vue'

describe('ContentCard', () => {
  it('renders properly', () => {
    const wrapper = mount(ContentCard)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.content-card').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const slotContent = '<div class="test-content">Test Content</div>'
    const wrapper = mount(ContentCard, {
      slots: {
        default: slotContent
      }
    })
    expect(wrapper.html()).toContain('Test Content')
    expect(wrapper.find('.test-content').exists()).toBe(true)
  })

  it('applies correct styling classes', () => {
    const wrapper = mount(ContentCard)
    const card = wrapper.find('.content-card')
    expect(card.classes()).toContain('content-card')
  })
}) 