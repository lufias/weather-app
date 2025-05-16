import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import WeatherCard from '../WeatherCard.vue';

describe('WeatherCard.vue', () => {
  const defaultProps = {
    location: 'London',
    temperature: 20,
    description: 'sunny',
    high: 25,
    low: 15,
    isCurrentLocation: false,
    weatherIcon: '01d',
    time: '12:00 PM'
  };

  it('renders properly with all props', () => {
    const wrapper = mount(WeatherCard, {
      props: defaultProps
    });

    expect(wrapper.find('[data-testid="weather-card"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="weather-location"]').text()).toBe('London');
    expect(wrapper.find('[data-testid="weather-temperature"]').text()).toBe('20°');
    expect(wrapper.find('[data-testid="weather-description"]').text()).toBe('Sunny');
    expect(wrapper.find('[data-testid="weather-temp-range"]').text().replace(/\s+/g, ' ')).toBe('H:25° L:15°');
    expect(wrapper.find('[data-testid="weather-time"]').text()).toBe('12:00 PM');
  });

  it('shows "My Location" when isCurrentLocation is true', () => {
    const wrapper = mount(WeatherCard, {
      props: {
        ...defaultProps,
        isCurrentLocation: true
      }
    });

    expect(wrapper.find('[data-testid="weather-location"]').text()).toBe('My Location');
  });

  it('capitalizes the first letter of description', () => {
    const wrapper = mount(WeatherCard, {
      props: {
        ...defaultProps,
        description: 'partly cloudy'
      }
    });

    expect(wrapper.find('[data-testid="weather-description"]').text()).toBe('Partly cloudy');
  });

  it('handles empty description gracefully', () => {
    const wrapper = mount(WeatherCard, {
      props: {
        ...defaultProps,
        description: ''
      }
    });

    expect(wrapper.find('[data-testid="weather-description"]').text()).toBe('');
  });

  it('does not show temperature range when high/low are undefined', () => {
    const wrapper = mount(WeatherCard, {
      props: {
        ...defaultProps,
        high: undefined,
        low: undefined
      }
    });

    expect(wrapper.find('[data-testid="weather-temp-range"]').text()).toBe('');
  });

  it('does not show time when time prop is not provided', () => {
    const wrapper = mount(WeatherCard, {
      props: {
        ...defaultProps,
        time: undefined
      }
    });

    expect(wrapper.find('[data-testid="weather-time"]').exists()).toBe(false);
  });

  it('applies current-location class when isCurrentLocation is true', () => {
    const wrapper = mount(WeatherCard, {
      props: {
        ...defaultProps,
        isCurrentLocation: true
      }
    });

    expect(wrapper.find('[data-testid="weather-card"]').classes()).toContain('current-location');
  });
}); 