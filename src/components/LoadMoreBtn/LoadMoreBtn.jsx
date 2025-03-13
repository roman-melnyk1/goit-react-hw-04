import React from 'react';
import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, isLoading }) => {
  return (
    <div className={styles.loadMoreContainer}>
      <button className={styles.loadMoreButton} onClick={onClick} disabled={isLoading}>
        {isLoading && <div className={styles.loader}></div>}
        {isLoading ? 'Завантаження...' : 'Завантажити ще'}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
