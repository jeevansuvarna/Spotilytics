import React, { useEffect, useState } from "react";
import { fetchTopArtist } from "../../services/spotify-service";
import styles from "./top-artist.module.css";

const TopArtist = () => {
  const [topArtist, setTopArtist] = useState([]);
  const [active, setActive] = useState("long_term");

  const fetchTopArtistList = (time_range = "long_term") => {
    setActive(time_range);
    fetchTopArtist(time_range).then((res) => {
      setTopArtist(res);
    });
  };
  useEffect(() => {
    fetchTopArtistList();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <h2>Top Artists</h2>
        <div className={styles.filter}>
          <button
            className={styles.filterButton}
            onClick={() => fetchTopArtistList("long_term")}
          >
            <div className={active == "long_term" && styles.active}>
              All Time
            </div>
          </button>
          <button
            className={styles.filterButton}
            onClick={() => fetchTopArtistList("medium_term")}
          >
            <div className={active == "medium_term" && styles.active}>
              Last 6 Months
            </div>
          </button>
          <button
            className={styles.filterButton}
            onClick={() => fetchTopArtistList("short_term")}
          >
            <div className={active == "short_term" && styles.active}>
              Last 4 Weeks
            </div>
          </button>
        </div>
      </div>
      <div className={styles.topArtistList}>
        {topArtist?.items?.map((item) => {
          return (
            <div className={styles.topArtistItem}>
              <img src={item?.images?.[0]?.url} alt="" />
              <a href={item?.href} className={styles.artistName}>
                {item?.name}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopArtist;
