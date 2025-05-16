import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '../SearchBar.vue';

describe('SearchBar.vue', () => {
  const mockSuggestions = [
    {
      label: 'New York, NY, USA',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      lat: 40.7128,
      lon: -74.0060
    }
  ];

  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
  });

  it('renders properly with default props', () => {
    const wrapper = mount(SearchBar, {
      props: {
        suggestions: [],
        placeholder: 'Search location'
      }
    });
    
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search location');
  });

  it('emits update:modelValue event after debounce', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        suggestions: []
      }
    });

    const input = wrapper.find('input');
    await input.setValue('test');
    
    await vi.advanceTimersByTime(300);
    await wrapper.vm.$nextTick();
    
    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toBeTruthy();
    expect(emitted![0]).toEqual(['test']);
  });

  it('shows suggestions when input is focused and suggestions exist', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        suggestions: mockSuggestions
      },
      attachTo: document.body
    });

    const input = wrapper.find('input');
    await input.setValue('New');
    await input.trigger('focus');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.suggestions-list').exists()).toBe(true);
    expect(wrapper.findAll('.suggestion-item').length).toBe(1);
  });

  it('emits select event when suggestion is clicked', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        suggestions: mockSuggestions
      },
      attachTo: document.body
    });

    await wrapper.find('input').setValue('New');
    await wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();

    const suggestionItem = wrapper.find('.suggestion-item');
    expect(suggestionItem.exists()).toBe(true);
    await suggestionItem.trigger('click');
    await wrapper.vm.$nextTick();

    const emitted = wrapper.emitted('select');
    expect(emitted).toBeTruthy();
    expect(emitted![0]).toEqual([mockSuggestions[0]]);
  });

  it('clears input when clear button is clicked', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        suggestions: []
      }
    });

    await wrapper.find('input').setValue('test');
    await wrapper.vm.$nextTick();
    await wrapper.find('.clear-btn').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('input').element.value).toBe('');
    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toBeTruthy();
    expect(emitted![0]).toEqual(['']);
  });

  it('hides suggestions when clicking outside', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        suggestions: mockSuggestions
      },
      attachTo: document.body
    });

    await wrapper.find('input').setValue('New');
    await wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    
    const event = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true
    });
    document.body.dispatchEvent(event);
    
    await vi.advanceTimersByTime(120);
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('.suggestions-list').exists()).toBe(false);

    wrapper.unmount();
  });
}); 