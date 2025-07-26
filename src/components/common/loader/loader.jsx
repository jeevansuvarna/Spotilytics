import React from 'react';
import styles from './graphLoader.module.css';

const GraphLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bars}>
        <div className={`${styles.bar} ${styles.bar1}`}></div>
        <div className={`${styles.bar} ${styles.bar2}`}></div>
        <div className={`${styles.bar} ${styles.bar3}`}></div>
        <div className={`${styles.bar} ${styles.bar4}`}></div>
        <div className={`${styles.bar} ${styles.bar5}`}></div>
      </div>
    </div>
  );
};

export default GraphLoader;
