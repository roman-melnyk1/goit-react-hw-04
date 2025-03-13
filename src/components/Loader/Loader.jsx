import React from 'react';
import { PuffLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <PuffLoader color="#36D7B7" size={50} />
    </div>
  );
};

export default Loader;