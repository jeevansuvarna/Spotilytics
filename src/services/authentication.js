import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

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

const BASE_URL = 'https://api.spotify.com/v1';

// ==== LOGIN URL ====
export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${encodeURIComponent(SCOPES)}`;

// ==== TOKEN HELPERS ====
export const setAccessToken = () => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get('access_token');
  const expiresIn = params.get('expires_in');

  if (accessToken) {
    const expiryTime = Date.now() + Number(expiresIn) * 1000;
    localStorage.setItem('spotify_token', accessToken);
    localStorage.setItem('token_expiry', expiryTime.toString());
    window.location.hash = '';
    return true;
  }

  // If user visited the page directly and no token is present, redirect to your custom login page
  if (!getAccessToken()) {
    window.location.href = '/'; // your login page
  }

  return false;
};

export const isTokenExpired = () => {
  const expiry = Number(localStorage.getItem('token_expiry') || 0);
  return Date.now() > expiry;
};

const getTokenFromUrl = () => {
  const hash = window.location.hash;
  if (!hash) return null;

  const params = new URLSearchParams(hash.substring(1)); // remove "#"
  const token = params.get('access_token');

  if (token) {
    localStorage.setItem('spotify_token', token);
    localStorage.setItem('token_expiry', Date.now() + 3600 * 1000); // 1 hour
    // Clean the URL
    window.history.replaceState({}, document.title, '/');
    return token;
  }

  return null;
};

export const getAccessToken = () => {
  const token = localStorage.getItem('spotify_token');
  const expiry = localStorage.getItem('token_expiry');

  if (!token || !expiry || Date.now() > parseInt(expiry, 10)) {
    return getTokenFromUrl(); // Only try extracting from URL on first load
  }

  return token;
};

export const logout = () => {
  localStorage.removeItem('spotify_token');
  localStorage.removeItem('token_expiry');
  setTimeout(() => {
    window.location.href = '/'; // goes to login page
  }, 100);
};

// ==== AXIOS INSTANCE ====
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  if (isTokenExpired()) {
    console.warn('Access token expired. Redirecting to login...');
    window.location.href = loginUrl;
    return Promise.reject('Access token expired');
  }

  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
