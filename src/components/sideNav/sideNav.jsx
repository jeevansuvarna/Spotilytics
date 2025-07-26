import styles from './sideNav.module.css';
import { Link, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  const [active, setActive] = useState('profile');

  useEffect(() => {
    if (pathname === '/top-artist') setActive('topArtist');
    else if (pathname === '/top-track') setActive('topTrack');
    else if (pathname === '/recent') setActive('recent');
    else if (pathname === '/paylist') setActive('paylist');
  }, [pathname]);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.logoImg}>
        <Link to=''>
          <Spotify />
        </Link>
      </div>
      <ul className={styles.navList}>
        <li className={styles.iconList}>
          <Link to='/' className={active === 'profile' && styles.active}>
            <div className={styles.navLogo}>
              <Account color={active === 'profile' ? '#fff' : '#9b9b9b'} />
            </div>
            <p>Profile</p>
          </Link>
        </li>
        <li className={styles.iconList}>
          <Link
            to='/top-artist'
            className={active === 'topArtist' && styles.active}
          >
            <div className={styles.navLogo}>
              <TopArtist color={active === 'topArtist' ? '#FFF' : '#9b9b9b'} />
            </div>
            <p>Top Artist</p>
          </Link>
        </li>
        <li className={styles.iconList}>
          <Link
            to='/top-track'
            className={active === 'topTrack' && styles.active}
          >
            <div className={styles.navLogo}>
              <TopTrack color={active === 'topTrack' ? '#FFF' : '#9b9b9b'} />
            </div>

            <p>Top Tracks</p>
          </Link>
        </li>
        <li className={styles.iconList}>
          <Link to='/recent' className={active === 'recent' && styles.active}>
            <div className={styles.navLogo}>
              <Recent color={active === 'recent' ? '#FFF' : '#9b9b9b'} />
            </div>

            <p>Recents</p>
          </Link>
        </li>
        <li className={styles.iconList}>
          <Link to='/paylist' className={active === 'paylist' && styles.active}>
            <div className={styles.navLogo}>
              <Playlist color={active === 'paylist' ? '#FFF' : '#9b9b9b'} />
            </div>

            <p>Paylist</p>
          </Link>
        </li>
      </ul>
      <div></div>
    </nav>
  );
};

export default SideNav;
