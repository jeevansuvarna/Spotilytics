import { Route, Routes } from 'react-router-dom';
import SideNav from '../../components/sideNav/sideNav.jsx';
import Profile from '../profile/profile.jsx';
import styles from './dashboard.module.css';
import TopArtist from '../top-artist/top-artist.jsx';
import TopTrack from '../top-track/top-track.jsx';
import RecentlyPlayed from '../recently/recently.jsx';
import Playlist from '../playlists/playlist.jsx';
import PlaylistPage from '../playlist-page/playlist.jsx';
import Recommendations from '../recommendations/recommendation.jsx';
import Track from '../track/track.jsx';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <SideNav />
      <Routes>
        <Route path='/' element={<Profile />} />
        <Route path='/top-artist' element={<TopArtist />} />
        <Route path='/top-track' element={<TopTrack />} />
        <Route path='/recent' element={<RecentlyPlayed />} />
        <Route path='/paylist' element={<Playlist />} />
        <Route path='/playlist/:playlistId' element={<PlaylistPage />} />
        <Route
          path='/recommendations/:playlistId'
          element={<Recommendations />}
        />
        <Route path='/track/:trackId' element={<Track />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
