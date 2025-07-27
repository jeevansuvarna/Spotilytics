import React, { useEffect, useState } from 'react';
import { fetchTopTrack } from '../../services/spotify-service';
import styles from './top-track.module.css';
import ListComponent from '../../components/common/list-component/list-component';
import GraphLoader from '../../components/common/loader/loader';

const TopTrack = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [active, setActive] = useState('long_term');
  const [isLoading, setIsLoading] = useState(true);

  const fetchTopTrackList = (time_range = 'long_term') => {
    setActive(time_range);
    setIsLoading(true);
    fetchTopTrack(time_range)
      .then((res) => {
        setTopTracks(res?.items);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchTopTrackList();
  }, []);

  if (isLoading) return <GraphLoader />;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <h2>Top Artists</h2>
        <div className={styles.filter}>
          <button
            className={styles.filterButton}
            onClick={() => fetchTopTrackList('long_term')}
          >
            <div className={active === 'long_term' && styles.active}>
              All Time
            </div>
          </button>
          <button
            className={styles.filterButton}
            onClick={() => fetchTopTrackList('medium_term')}
          >
            <div className={active === 'medium_term' && styles.active}>
              Last 6 Months
            </div>
          </button>
          <button
            className={styles.filterButton}
            onClick={() => fetchTopTrackList('short_term')}
          >
            <div className={active === 'short_term' && styles.active}>
              Last 4 Weeks
            </div>
          </button>
        </div>
      </div>
      <div className={styles.trackContainer}>
        <ListComponent lists={topTracks} limit={50} />
      </div>
    </div>
  );
};

export default TopTrack;
