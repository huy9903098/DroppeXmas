import React from 'react';
import { NavBar } from '../NavBar/NavBar';
import styles from './Layout.module.scss';

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <NavBar></NavBar>
      <div className={styles.container}>{children}</div>
    </>
  );
};
