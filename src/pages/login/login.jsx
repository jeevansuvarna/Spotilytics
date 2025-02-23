import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import Dashboard from '../dashboard/dashboard';

const CLIENT_ID = 'c39454715c1c4cba9bf7a7672f42a628';
const REDIRECT_URI = 'http://localhost:3000/';

const SCOPE = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-modify',
  'user-follow-read',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private',
  'user-top-read',
  'user-read-recently-played',
  'user-read-playback-position',
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-modify-playback-state',
  'app-remote-control',
  'streaming',
].join(' ');

const loginUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${encodeURIComponent(SCOPE)}`;

const Login = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL if available
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');
    console.log(accessToken, 'ss');
    if (accessToken) {
      localStorage.setItem('spotifyToken', accessToken);
      setToken(accessToken);
    } else {
      // Check local storage in case of page refresh
      const storedToken = localStorage.getItem('spotifyToken');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [navigate]);

  return (
    <>
      {token ? (
        <Dashboard />
      ) : (
        <div className={styles.loginContainer}>
          <div className={styles.loginText}>Spotify Profile</div>
          <a className={styles.loginButton} href={loginUrl}>
            LOG IN TO SPOTIFY
          </a>
        </div>
      )}
    </>
  );
};

export default Login;
