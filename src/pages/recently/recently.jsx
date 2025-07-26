import React, { useEffect, useState } from 'react';
import { fetchRecentlyPlayed } from '../../services/spotify-service';
import styles from './recently.module.css';
import ListComponent from '../../components/common/list-component/list-component';
import GraphLoader from '../../components/common/loader/loader';

const RecentlyPlayed = () => {
  const [recently, setRecently] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecenlty = (time_range = 'long_term') => {
    setIsLoading(true);
    fetchRecentlyPlayed(time_range)
      .then((res) => {
        setRecently(res?.items);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchRecenlty();
  }, []);

  if (isLoading) return <GraphLoader />;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <h2>Recently Played</h2>
      </div>
      <div className={styles.trackContainer}>
        <ListComponent lists={recently} limit={50} />
      </div>
    </div>
  );
};

export default RecentlyPlayed;
