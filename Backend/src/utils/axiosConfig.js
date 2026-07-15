import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Parse comma-separated keys or fallback to single key
const keysString = process.env.RAPIDAPI_KEYS || process.env.RAPIDAPI_KEY || '';
const keys = keysString.split(',').map(k => k.trim()).filter(k => k);

let currentKeyIndex = 0;

export const getRapidApiKey = () => {
  if (keys.length === 0) return '';
  return keys[currentKeyIndex];
};

export const rotateRapidApiKey = () => {
  if (keys.length > 1) {
    currentKeyIndex = (currentKeyIndex + 1) % keys.length;
    console.log(`[KeyRotator] Rate limit hit. Rotated RapidAPI Key to index ${currentKeyIndex}`);
  } else {
    console.warn(`[KeyRotator] Rate limit hit, but only 1 key is configured. Cannot rotate.`);
  }
  return keys[currentKeyIndex];
};

export const rapidAxios = axios.create();

rapidAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // 429 indicates "Too Many Requests" (Rate Limit Exceeded)
    // We only retry once to prevent infinite loops if all keys are exhausted
    if (error.response && error.response.status === 429 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const newKey = rotateRapidApiKey();
      originalRequest.headers['x-rapidapi-key'] = newKey;
      
      // Retry the request with the new key
      return rapidAxios(originalRequest);
    }
    
    return Promise.reject(error);
  }
);
