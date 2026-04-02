export function getRelativeWind(windDeg: number, trackDirection: number): string {
  const relativeBearing = (windDeg - trackDirection + 360) % 360;

  if (relativeBearing > 330 || relativeBearing <= 30) {
    return 'Headwind. Go training instead';
  }
  if (relativeBearing >= 31 && relativeBearing <= 70) {
    return 'Headwind for 100m & 200m';
  }
  if (relativeBearing >= 71 && relativeBearing <= 90) {
    return 'Crosswind. Not great for the 200m';
  }
  if (relativeBearing >= 91 && relativeBearing <= 150) {
    return 'Slight tailwind 100m, headwind on the bend';
  }
  if (relativeBearing >= 151 && relativeBearing <= 220) {
    return 'Tailwind. Great for a 100m';
  }
  if (relativeBearing >= 221 && relativeBearing <= 270) {
    return 'Following crosswind. Good for 200m';
  }
  if (relativeBearing >= 271 && relativeBearing <= 330) {
    return 'Headwind 100m. Ok for 200m bend';
  }

  return 'Variable wind';
}

export function getWindCategory(windDeg: number, trackDirection: number): 'headwind' | 'tailwind' | 'crosswind' | 'mixed' {
  const relativeBearing = (windDeg - trackDirection + 360) % 360;

  if (relativeBearing > 330 || relativeBearing <= 30) return 'headwind';
  if (relativeBearing >= 31 && relativeBearing <= 70) return 'headwind';
  if (relativeBearing >= 71 && relativeBearing <= 90) return 'crosswind';
  if (relativeBearing >= 91 && relativeBearing <= 150) return 'mixed';
  if (relativeBearing >= 151 && relativeBearing <= 220) return 'tailwind';
  if (relativeBearing >= 221 && relativeBearing <= 270) return 'tailwind';
  if (relativeBearing >= 271 && relativeBearing <= 330) return 'mixed';

  return 'mixed';
}

/**
 * Adjusts raw OpenWeather wind speed to account for stadium shielding
 * @param speed Wind speed in m/s
 * @returns Shielded wind speed
 */
export function shieldWindSpeed(speed: number): number {
  return speed * 0.3;
}

/**
 * Returns the color key based on the wind description
 * @param windDesc String returned by getRelativeWind
 */
export function getWindColor(windDesc: string): 'red' | 'orange' | 'green' | 'slate' {
  switch (windDesc) {
    case 'Headwind. Go training instead':
    case 'Headwind for 100m & 200m':
    case 'Crosswind. Not great for the 200m':
      return 'red';
    case 'Slight tailwind 100m, headwind on the bend':
    case 'Headwind 100m. Ok for 200m bend':
      return 'orange';
    case 'Following crosswind. Good for 200m':
    case 'Tailwind. Great for a 100m':
      return 'green';
    default:
      return 'slate';
  }
}
