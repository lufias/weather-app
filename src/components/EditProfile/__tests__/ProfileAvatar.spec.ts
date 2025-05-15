/// <reference types="vitest/globals" />
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileAvatar from '../ProfileAvatar.vue'
import defaultAvatarImg from '../../../assets/avatar.png'

describe('ProfileAvatar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with default avatar when no avatar prop is provided', () => {
    const wrapper = mount(ProfileAvatar)
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(defaultAvatarImg)
  })

  it('renders with provided avatar', () => {
    const testAvatar = 'data:image/jpeg;base64,test123'
    const wrapper = mount(ProfileAvatar, {
      props: {
        avatar: testAvatar
      }
    })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(testAvatar)
  })

  it('does not show edit button and file input when not editable', () => {
    const wrapper = mount(ProfileAvatar)
    expect(wrapper.find('.edit-icon').exists()).toBe(false)
    expect(wrapper.find('input[type="file"]').exists()).toBe(false)
  })

  it('shows edit button and file input when editable', () => {
    const wrapper = mount(ProfileAvatar, {
      props: {
        editable: true
      }
    })
    expect(wrapper.find('.edit-icon').exists()).toBe(true)
    expect(wrapper.find('input[type="file"]').exists()).toBe(true)
  })

  it('triggers file input when edit button is clicked', async () => {
    const wrapper = mount(ProfileAvatar, {
      props: {
        editable: true
      }
    })
    
    const fileInput = wrapper.find('input[type="file"]').element as HTMLInputElement
    const clickSpy = vi.spyOn(fileInput, 'click')
    
    await wrapper.find('.edit-icon').trigger('click')
    expect(clickSpy).toHaveBeenCalled()
  })

  it('emits update:avatar event with base64 when valid image is selected', async () => {
    const wrapper = mount(ProfileAvatar, {
      props: {
        editable: true
      }
    })

    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: vi.fn(function(this: any) {
        // Simulate async success
        setTimeout(() => {
          this.result = 'data:image/jpeg;base64,test123';
          this.onload && this.onload();
        }, 0);
      }),
      result: null,
      onload: null as any,
      onerror: null as any
    }
    
    const originalFileReader = window.FileReader
    window.FileReader = vi.fn(() => mockFileReader) as any

    // Create a mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    // Trigger file selection
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    await input.trigger('change')

    // Wait for the FileReader to complete
    await vi.runAllTimersAsync()

    // Verify emission
    expect(wrapper.emitted('update:avatar')?.[0]).toEqual(['data:image/jpeg;base64,test123'])

    // Restore original FileReader
    window.FileReader = originalFileReader
  })

  it('does not emit update:avatar event for non-image files', async () => {
    const wrapper = mount(ProfileAvatar, {
      props: {
        editable: true
      }
    })

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    // Create a mock file
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    
    // Trigger file selection using setValue
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    await input.trigger('change')

    expect(wrapper.emitted('update:avatar')).toBeFalsy()
    expect(consoleSpy).toHaveBeenCalledWith('Please select an image file')
    
    consoleSpy.mockRestore()
  })

  it('handles FileReader error gracefully', async () => {
    const wrapper = mount(ProfileAvatar, {
      props: {
        editable: true
      }
    })

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Mock FileReader with error
    const mockError = new Error('File reading failed')
    const mockFileReader = {
      readAsDataURL: vi.fn(function(this: any) {
        // Simulate async error
        setTimeout(() => {
          this.error = mockError;
          this.onerror && this.onerror(new ErrorEvent('error'));
        }, 0);
      }),
      error: null,
      onload: null as any,
      onerror: null as any
    }
    
    const originalFileReader = window.FileReader
    window.FileReader = vi.fn(() => mockFileReader) as any

    // Create a mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    // Trigger file selection
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    await input.trigger('change')

    // Wait for the error to be processed
    await vi.runAllTimersAsync()

    expect(wrapper.emitted('update:avatar')).toBeFalsy()
    expect(consoleSpy).toHaveBeenCalledWith('Error processing image:', mockError)
    
    consoleSpy.mockRestore()
    window.FileReader = originalFileReader
  })

  it('clears file input after successful upload', async () => {
    const wrapper = mount(ProfileAvatar, {
      props: {
        editable: true
      }
    })

    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: vi.fn(function(this: any) {
        // Simulate async success
        setTimeout(() => {
          this.result = 'data:image/jpeg;base64,test123';
          this.onload && this.onload();
        }, 0);
      }),
      result: null,
      onload: null as any,
      onerror: null as any
    }
    
    const originalFileReader = window.FileReader
    window.FileReader = vi.fn(() => mockFileReader) as any

    // Create a mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    // Trigger file selection
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    await input.trigger('change')

    // Wait for the FileReader to complete
    await vi.runAllTimersAsync()

    // Check if input was cleared
    const fileInput = wrapper.find('input[type="file"]').element as HTMLInputElement
    expect(fileInput.value).toBe('')

    // Restore original FileReader
    window.FileReader = originalFileReader
  })
}) 