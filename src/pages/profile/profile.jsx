import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import {
  fetchFollowing,
  fetchPaylist,
  fetchUserProfile,
} from '../../services/spotify-service';
import TopArtist from '../../components/topArtist/topArtist';
import TopTrack from '../../components/topTrack/topTrack';
import GraphLoader from '../../components/common/loader/loader';
import { logout } from '../../services/authentication';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [userPlaylist, setUserPlaylist] = useState({});
  const [followingData, setFollowing] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [user, playlist, following] = await Promise.all([
          fetchUserProfile(),
          fetchPaylist(),
          fetchFollowing(),
        ]);

        setUserData(user);
        setUserPlaylist(playlist);
        setFollowing(following);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally, set error state here
      } finally {
        setIsLoading(false);
        console.log('Data fetch completed');
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <GraphLoader />;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.userContainer}>
        <div className={styles.userImg}>
          <img src={userData?.images?.[0]?.url} alt='' />
        </div>
        <div className={styles.userName}>{userData?.display_name}</div>
        <div className={styles.userStats}>
          <div className={styles.stats}>
            <div className={styles.count}>{userData?.followers?.total}</div>
            <div className={styles.text}>followers</div>
          </div>
          <div className={styles.stats}>
            <div className={styles.count}>{followingData?.total || 0}</div>
            <div className={styles.text}>following</div>
          </div>
          <div className={styles.stats}>
            <div className={styles.count}>{userPlaylist?.total}</div>
            <div className={styles.text}>playlists</div>
          </div>
        </div>
        <div className={styles.logout} onClick={() => logout()}>
          logout
        </div>
      </div>
      <div className={styles.subContainer}>
        <TopArtist />
        <TopTrack />
      </div>
    </div>
  );
};

export default Profile;
