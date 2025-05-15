export const API_KEY = 'a8bcd4ef1794d3d95d4ec15f5f5a15dc';

export const API_BASE_URL = 'https://api.openweathermap.org';
export const GEO_API_VERSION = '1.0';
export const WEATHER_API_VERSION = '3.0';

export const API_ENDPOINTS = {
  geocoding: `${API_BASE_URL}/geo/${GEO_API_VERSION}/direct`,
  oneCall: `${API_BASE_URL}/data/${WEATHER_API_VERSION}/onecall`
};

export const DEFAULT_UNITS = 'metric'; 