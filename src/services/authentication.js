import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';
const CLIENT_ID = 'c39454715c1c4cba9bf7a7672f42a628';
const REFRESH_TOKEN_URL = 'https://accounts.spotify.com/api/token';

const api = axios.create({
  baseURL: BASE_URL,
});

const REDIRECT_URI = 'http://localhost:3000/'; // Change to match your app URL
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'user-library-modify',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-read',
  'user-follow-modify',
  'user-top-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'streaming',
  'user-read-recently-played',
].join(' ');

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${encodeURIComponent(SCOPES)}`;

// Function to get token from localStorage
const getAccessToken = () => localStorage.getItem('spotify_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

// Attach token dynamically to requests
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// **Interceptor to Handle 401 & Refresh Token**
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn('Access token expired. Refreshing...');

      const newToken = await refreshAccessToken();
      console.log(newToken, 'Refresh');
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config); // Retry the original request
      }
    }
    return Promise.reject(error);
  }
);

// **Function to Refresh Access Token**
const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      console.error('No refresh token available.');
      return null;
    }

    const response = await fetch(REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
      }),
    });

    const data = await response.json();
    console.log('refresh data', data);
    if (data.access_token) {
      localStorage.setItem('spotify_token', data.access_token);
      return data.access_token;
    } else {
      console.error('Failed to refresh token:', data);
      return null;
    }
  } catch (err) {
    console.error('Error refreshing access token:', err);
    return null;
  }
};

export const setAccessToken = () => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get('access_token');
  const spotify_token = localStorage.getItem('spotify_token');
  if (accessToken) return true;

  if (accessToken && !spotify_token) {
    localStorage.setItem('spotify_token', accessToken);
    return true;
  }

  return false;
};

export default api;
