import { useEffect, useState } from 'react';
import styles from './playlist.module.css';
import { fetchPaylist } from '../../services/spotify-service';
import { Link } from 'react-router-dom';
import GraphLoader from '../../components/common/loader/loader';

const Playlist = () => {
  const [playlist, setUserPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchPaylist()
      .then((res) => {
        setUserPlaylist(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <GraphLoader />;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <h2>Your Playlist</h2>
      </div>
      <div className={styles.playlistList}>
        {playlist?.items?.map((item, index) => {
          return (
            <Link to={`/playlist/${item.id}`} key={item?.id || index}>
              <div className={styles.playlistItems}>
                <div className={styles.imageWrapper}>
                  <img src={item?.images?.[0]?.url} alt={item?.name} />
                  <div className={styles.playIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className={styles.playlistName}>{item?.name}</div>
                <div className={styles.tracks}>
                  {item?.tracks?.total} Tracks
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;
