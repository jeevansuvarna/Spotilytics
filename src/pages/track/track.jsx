import React, { useEffect, useMemo, useState } from 'react';
import styles from './track.module.css';
import { getTrackById } from '../../services/spotify-service';
import { useParams } from 'react-router-dom';
import { converToMin } from '../../helper/utils';
import GraphLoader from '../../components/common/loader/loader';

const Track = () => {
  const { trackId } = useParams();
  const [trackDetail, setTrackDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTrackById(trackId)
      .then((res) => {
        setTrackDetail(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const artist = useMemo(() => {
    let artistList = [];
    trackDetail?.album?.artists?.forEach((element) => {
      artistList.push(element?.name);
    });
    return artistList;
  }, [trackDetail]);

  if (isLoading) return <GraphLoader />;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topContainer}>
        <img src={trackDetail?.album?.images?.[1]?.url} alt='' />
        <div className={styles.details}>
          <p className={styles.title}>{trackDetail?.album?.name}</p>
          <p className={styles.artist}>{artist.join(',')}</p>
          <p className={styles.year}>
            {trackDetail?.album?.release_date?.split('-')[0]}
          </p>
          <a
            href={trackDetail?.external_urls?.spotify}
            target='_blank'
            className={`${styles.playbtn} spotify-button`}
          >
            PLAY ON SPOTIFY
          </a>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.cell}>
          <div className={styles.ttext}>
            {converToMin(trackDetail?.duration_ms)}
          </div>
          <div className={styles.thead}>Duration</div>
        </div>
        <div className={styles.cell}>
          <div className={styles.ttext}>{trackDetail?.popularity}%</div>
          <div className={styles.thead}>Popularity</div>
        </div>
        <div className={styles.cell}>
          <div className={styles.ttext}>{trackDetail?.album?.album_type}</div>
          <div className={styles.thead}>Album Type</div>
        </div>
        <div className={styles.cell}>
          <div className={styles.ttext}>{trackDetail?.album?.total_tracks}</div>
          <div className={styles.thead}>Total Tracks</div>
        </div>
      </div>
    </div>
  );
};
export default Track;
