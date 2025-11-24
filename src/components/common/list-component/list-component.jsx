import React from 'react';
import styles from './list-component.module.css';
import { Link } from 'react-router-dom';

const ListComponent = ({ lists, limit = 10, showRank = true }) => {
  return (
    <div className={styles.trackList}>
      {lists?.slice(0, limit)?.map((item, index) => {
        let artistList = [];
        item = item?.track || item;
        item?.artists?.forEach((element) => {
          artistList.push(element?.name);
        });
        if (!item?.album?.images?.[0]?.url) return null;
        return (
          <Link to={`/track/${item.id}`} key={item.id || index}>
            <div className={styles.trackItem}>
              {showRank && (
                <div className={styles.rankNumber}>{index + 1}</div>
              )}
              <div className={styles.trackImg}>
                <img src={item?.album?.images?.[0]?.url} alt='album' />
              </div>
              <div className={styles.trackInfo}>
                <div className={styles.trackDetails}>
                  <div className={styles.trackName}>{item?.name}</div>
                  <div className={styles.trackArtist}>
                    <span>{artistList?.join(', ')}</span>
                    <span className={styles.dot}>·</span>
                    <span>{item?.album?.name}</span>
                  </div>
                </div>
                {item?.duration_ms > 0 && (
                  <div className={styles.trackDuration}>
                    {Math.floor(item?.duration_ms / 60000)}:{String(Math.floor((item?.duration_ms % 60000) / 1000)).padStart(2, '0')}
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ListComponent;
