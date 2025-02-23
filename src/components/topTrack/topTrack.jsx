import React, { useEffect, useState } from 'react';
import { fetchTopTrack } from '../../services/spotify-service';
import styles from './topTrack.module.css';
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
        <a href="" className={styles.seeMore}>
          see more
        </a>
      </div>
      {topTrack?.slice(0, 10)?.map((item, index) => {
        let artistList = [];
        item?.artists?.forEach((element) => {
          artistList.push(element?.name);
        });
        if (!item?.album?.images?.[0]?.url) return;
        return (
          <div className={styles.trackItem}>
            <div className={styles.trackImg}>
              <img src={item?.album?.images?.[0]?.url} />
            </div>
            <div className={styles.trackInfo}>
              <div className={styles.trackDetails}>
                <div className={styles.trackName}>{item?.name}</div>
                <div className={styles.trackArtist}>
                  <span>{artistList?.join(',')}</span>
                  &nbsp;&nbsp;
                  <span>.</span>
                  &nbsp;&nbsp;
                  <span>{item?.album?.name}</span>
                </div>
              </div>
              {item?.duration_ms > 0 && (
                <div className={styles.trackDuration}>
                  {(item?.duration_ms / 100000)
                    .toFixed(2)
                    .toString()
                    .replaceAll('.', ':')}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopTrack;
