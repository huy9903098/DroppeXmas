import React from 'react';
import styles from './TitleBar.module.scss';

interface TitleBarProps {}

export const TitleBar: React.FC<TitleBarProps> = ({}) => {
  return (
    <div className={styles.title}>
      <h1 className={styles.h1resp}>WishList Collection</h1>
      {/* <input type="text" className={styles.searchBox} name="txtBox" /> */}
    </div>
  );
};
