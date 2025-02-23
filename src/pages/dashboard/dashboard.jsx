import { Route, Routes } from "react-router-dom";
import SideNav from "../../components/sideNav/sideNav.jsx";
import Profile from "../profile/profile.jsx";
import styles from "./dashboard.module.css";
import TopArtist from "../top-artist/top-artist.jsx";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <SideNav />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/top-artist" element={<TopArtist />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
