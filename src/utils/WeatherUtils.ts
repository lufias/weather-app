export const getWeatherGradient = (iconCode: string | undefined) => {
  if (!iconCode) return 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)';
  
  const isDay = iconCode.endsWith('d');
  const weatherType = iconCode.substring(0, 2);

  // Default gradients
  const defaultGradient = isDay 
    ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
    : 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)';

  const gradients: Record<string, string> = {
    // Clear sky
    '01': isDay 
      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
      : 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)',
    // Few clouds
    '02': isDay 
      ? 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)'
      : 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
    // Scattered clouds
    '03': isDay 
      ? 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)'
      : 'linear-gradient(135deg, #1e40af 0%, #4338ca 100%)',
    // Broken clouds / Overcast
    '04': isDay 
      ? 'linear-gradient(135deg, #a1a1aa 0%, #64748b 100%)' // grayish blue for overcast
      : 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
    // Shower rain
    '09': isDay 
      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
      : 'linear-gradient(135deg, #1e40af 0%, #312e81 100%)',
    // Rain
    '10': isDay 
      ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
      : 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
    // Thunderstorm
    '11': isDay 
      ? 'linear-gradient(135deg, #4b5563 0%, #1f2937 100%)'
      : 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    // Snow
    '13': isDay 
      ? 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)'
      : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    // Mist
    '50': isDay 
      ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
      : 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
  };

  return gradients[weatherType] || defaultGradient;
}; 