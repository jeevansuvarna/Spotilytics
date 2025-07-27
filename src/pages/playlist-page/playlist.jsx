import styles from './playlist.module.css';
import React, { useEffect, useState } from 'react';
import {
  fetchAudioFeature,
  fetchCurrentPaylist,
} from '../../services/spotify-service';
import { Link, useParams } from 'react-router-dom';
import ListComponent from '../../components/common/list-component/list-component';
import GraphLoader from '../../components/common/loader/loader';

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [playlistDetail, setPlaylistDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchCurrentPaylist(playlistId)
      .then((res) => {
        setPlaylistDetails(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
    fetchAudioFeature(playlistId).then((res) => {});
  }, []);

  const imageUrl =
    playlistDetail?.images?.[1]?.url || playlistDetail?.images?.[0]?.url || '';

  if (isLoading) return <GraphLoader />;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.playlistImage}>
          <img src={imageUrl} alt='' />
        </div>
        <div className={styles.playlistTitle}>{playlistDetail?.name}</div>
        <a
          href={playlistDetail?.owner?.href}
          target='_blank'
          className={styles.playlistOwner}
        >
          By {playlistDetail?.owner?.display_name}
        </a>
        <div className={styles.playlistOwner}>
          Followers: {playlistDetail?.followers?.total}
        </div>
        {playlistDetail?.description != 'null' ? (
          <div className={styles.description}>
            {playlistDetail?.description}
          </div>
        ) : (
          <></>
        )}
        <a href={playlistDetail?.external_urls?.spotify} target='_blank'>
          <div className={`${styles.playbtn} spotify-button`}>
            Open On Spotify
          </div>
        </a>
        {/* <Link to={`/recommendations/${playlistDetail?.id}`}>
          <div className={`${styles.recommendation} spotify-button`}>
            Get Recommendation
          </div>
        </Link> */}
      </div>
      <div className={styles.rightContainer}>
        <ListComponent lists={playlistDetail?.tracks?.items} limit={1000} />
      </div>
    </div>
  );
};

export default PlaylistPage;
