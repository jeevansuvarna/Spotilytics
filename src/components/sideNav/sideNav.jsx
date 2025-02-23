import styles from './sideNav.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Account,
  Playlist,
  Recent,
  Spotify,
  TopArtist,
  TopTrack,
} from '../icons/icons';

const SideNav = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('profile');
  useEffect(() => {
    const path = window.location.href;
    if (path === '/top-artist') setActive('topArtist');
    else if (path === '/top-track') setActive('topTrack');
    else if (path === '/recent') setActive('recent');
    else if (path === '/paylist') setActive('paylist');
  }, [navigate]);
  return (
    <nav className={styles.navContainer}>
      <div className={styles.logoImg}>
        <a href="">
          <Spotify />
        </a>
      </div>
      <ul className={styles.navList}>
        <li className={styles.iconList}>
          <a href="/" className={active === 'profile' && styles.active}>
            <div className={styles.navLogo}>
              <Account color={active === 'profile' ? '#fff' : '#9b9b9b'} />
            </div>
            <p>Profile</p>
          </a>
        </li>
        <li className={styles.iconList}>
          <a
            href="/topArtist"
            className={active === 'topArtist' && styles.active}
          >
            <div className={styles.navLogo}>
              <TopArtist color={active === 'topArtist' ? '#FFF' : '#9b9b9b'} />
            </div>
            <p>Top Artist</p>
          </a>
        </li>
        <li className={styles.iconList}>
          <a
            href="/topArtist"
            className={active === 'topTrack' && styles.active}
          >
            <div className={styles.navLogo}>
              <TopTrack color={active === 'topTrack' ? '#FFF' : '#9b9b9b'} />
            </div>

            <p>Top Tracks</p>
          </a>
        </li>
        <li className={styles.iconList}>
          <a href="/recent" className={active === 'recent' && styles.active}>
            <div className={styles.navLogo}>
              <Recent color={active === 'recent' ? '#FFF' : '#9b9b9b'} />
            </div>

            <p>Recents</p>
          </a>
        </li>
        <li className={styles.iconList}>
          <a href="/paylist" className={active === 'paylist' && styles.active}>
            <div className={styles.navLogo}>
              <Playlist color={active === 'paylist' ? '#FFF' : '#9b9b9b'} />
            </div>

            <p>paylist</p>
          </a>
        </li>
      </ul>
      <div></div>
    </nav>
  );
};

export default SideNav;
