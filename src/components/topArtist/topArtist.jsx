import React, { useEffect, useState } from 'react';
import styles from './topArtist.module.css';
import { fetchTopArtist } from '../../services/spotify-service';
import { Link } from 'react-router-dom';

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
        <Link to='/top-artist' className={styles.seeMore}>
          see more
        </Link>
      </div>
      <div>
        <ul>
          {topArtist?.slice(0, 10).map((item, index) => {
            return (
              <li className={styles.artists} key={item?.id || index}>
                <div className={styles.rankNumber}>{index + 1}</div>
                <div className={styles.artistImg}>
                  <img src={item?.images?.[0]?.url} alt='artist' />
                </div>
                <div className={styles.artistName}>
                  {item?.name}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TopArtist;
