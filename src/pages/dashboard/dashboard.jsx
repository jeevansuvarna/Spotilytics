import { Route, Routes } from 'react-router-dom';
import SideNav from '../../components/sideNav/sideNav.jsx';
import Profile from '../profile/profile.jsx';
import styles from './dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <SideNav />
      <Routes>
        <Route path="/" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
