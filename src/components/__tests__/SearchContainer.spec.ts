import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import SearchContainer from '../SearchContainer.vue';
import SearchBar from '../SearchBar.vue';

// Mock fetch API
const mockFetch = vi.fn();
(globalThis as any).fetch = mockFetch;

describe('SearchContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search bar with correct props', () => {
    const wrapper = mount(SearchContainer);
    const searchBar = wrapper.findComponent(SearchBar);
    
    expect(searchBar.exists()).toBe(true);
    expect(searchBar.props('placeholder')).toBe('Search for a city or airport');
    expect(searchBar.props('suggestions')).toEqual([]);
  });

  it('fetches suggestions when search value changes', async () => {
    const mockApiResponse = [
      {
        name: 'London',
        state: null,
        country: 'GB',
        lat: 51.5074,
        lon: -0.1278
      }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    });

    const wrapper = mount(SearchContainer);
    const searchBar = wrapper.findComponent(SearchBar);

    // Trigger search
    await searchBar.vm.$emit('update:modelValue', 'London');
    
    // Wait for all promises to resolve
    await flushPromises();
    
    // Verify API call
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('London')
    );

    // Verify suggestions are formatted correctly
    expect(searchBar.props('suggestions')).toEqual([
      {
        label: 'London, GB',
        city: 'London',
        state: null,
        country: 'GB',
        lat: 51.5074,
        lon: -0.1278
      }
    ]);
  });

  it('handles empty search query', async () => {
    const wrapper = mount(SearchContainer);
    const searchBar = wrapper.findComponent(SearchBar);

    // Trigger empty search
    await searchBar.vm.$emit('update:modelValue', '  ');
    await flushPromises();
    
    // Verify no API call was made
    expect(mockFetch).not.toHaveBeenCalled();
    
    // Verify suggestions are cleared
    expect(searchBar.props('suggestions')).toEqual([]);
  });

  it('handles API error gracefully', async () => {
    // Mock console.error to prevent test output noise
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    mockFetch.mockRejectedValueOnce(new Error('API Error'));

    const wrapper = mount(SearchContainer);
    const searchBar = wrapper.findComponent(SearchBar);

    // Trigger search
    await searchBar.vm.$emit('update:modelValue', 'London');
    
    // Wait for all promises to resolve
    await flushPromises();

    // Verify error was logged
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching city suggestions:',
      expect.any(Error)
    );

    // Verify suggestions are cleared on error
    expect(searchBar.props('suggestions')).toEqual([]);

    // Restore console.error
    consoleSpy.mockRestore();
  });

  it('formats city suggestions with state information', async () => {
    const mockApiResponse = [
      {
        name: 'Portland',
        state: 'Oregon',
        country: 'US',
        lat: 45.5155,
        lon: -122.6789
      }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    });

    const wrapper = mount(SearchContainer);
    const searchBar = wrapper.findComponent(SearchBar);

    // Trigger search
    await searchBar.vm.$emit('update:modelValue', 'Portland');
    
    // Wait for all promises to resolve
    await flushPromises();

    // Verify suggestions are formatted with state information
    expect(searchBar.props('suggestions')).toEqual([
      {
        label: 'Portland, Oregon, US',
        city: 'Portland',
        state: 'Oregon',
        country: 'US',
        lat: 45.5155,
        lon: -122.6789
      }
    ]);
  });
}); 