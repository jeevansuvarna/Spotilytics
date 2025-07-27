import React, { useEffect, useState } from 'react';
import {
  fetchCurrentPaylist,
  getRecommendations,
} from '../../services/spotify-service';
import styles from './recommendation.module.css';
import { useParams } from 'react-router-dom';

const Recommendations = () => {
  const { playlistId } = useParams();
  const [playlistDetail, setPlaylistDetails] = useState({});

  useEffect(() => {
    fetchCurrentPaylist(playlistId).then((res) => {
      setPlaylistDetails(res);
      let ids = [];
      res?.tracks?.items?.forEach((item) => {
        ids.push(item.track.id);
      });
      getRecommendations(ids.join(',')).then((res) => {
        console.log(res, 'rec');
      });
    });
  }, [playlistId]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <h2>Recommended Tracks Based On {playlistDetail?.name}</h2>
      </div>
      {/* <div className={styles.recommendations}>
        <ListComponent lists={} limit={50} />
      </div> */}
    </div>
  );
};

export default Recommendations;
