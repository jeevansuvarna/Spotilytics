import React from 'react';
import styles from './list-component.module.css';
import { Link } from 'react-router-dom';

const ListComponent = ({ lists, limit = 10 }) => {
  return (
    <>
      {lists?.slice(0, limit)?.map((item, index) => {
        let artistList = [];
        item = item?.track || item;
        item?.artists?.forEach((element) => {
          artistList.push(element?.name);
        });
        if (!item?.album?.images?.[0]?.url) return null;
        return (
          <Link to={`/track/${item.id}`}>
            <div className={styles.trackItem}>
              <div className={styles.trackImg}>
                <img src={item?.album?.images?.[0]?.url} alt='album' />
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
          </Link>
        );
      })}
    </>
  );
};
export default ListComponent;
