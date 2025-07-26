import React, { useEffect, useState } from 'react';
import { fetchTopTrack } from '../../services/spotify-service';
import styles from './topTrack.module.css';
import ListComponent from '../common/list-component/list-component';
const TopTrack = () => {
  const [topTrack, setTopTracks] = useState([]);
  useEffect(() => {
    fetchTopTrack().then((res) => {
      setTopTracks(res?.items);
      console.log(res?.items, 'check');
    });
  }, []);

  return (
    <div className={styles.trackContainer}>
      <div className={styles.trackHeading}>
        <h3>Top Artists of All Time</h3>
        <a href='' className={styles.seeMore}>
          see more
        </a>
      </div>
      <ListComponent lists={topTrack} />
    </div>
  );
};

export default TopTrack;
