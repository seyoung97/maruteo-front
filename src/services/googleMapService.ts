import axios from 'axios';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 * 주소를 위도/경도 좌표로 변환 (구글 Geocoding API)
 * @param address 변환할 주소 문자열
 * @returns { lat: number, lng: number } 또는 null
 */
export async function getLatLngFromAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;
  const res = await axios.get(url);
  const result = res.data.results[0];
  if (result) {
    return {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    };
  }
  return null;
} 