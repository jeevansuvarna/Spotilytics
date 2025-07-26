import React, { useEffect, useState } from 'react';
import styles from './topArtist.module.css';
import { fetchTopArtist } from '../../services/spotify-service';

const TopArtist = () => {
  const [topArtist, setTopArtist] = useState([]);
  useEffect(() => {
    fetchTopArtist().then((res) => {
      setTopArtist(res?.items);
    });
  }, []);
  return (
    <div className={styles.trackList}>
      <div className={styles.trackHeading}>
        <h3>Top Artists of All Time</h3>
        <a href='' className={styles.seeMore}>
          see more
        </a>
      </div>
      <div>
        <ul>
          {topArtist?.slice(0, 10).map((item) => {
            return (
              <li className={styles.artists}>
                <a href='' className={styles.artistImg}>
                  <img src={item?.images?.[0]?.url} />
                </a>
                <a href='' className={styles.artistName}>
                  {item?.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TopArtist;
