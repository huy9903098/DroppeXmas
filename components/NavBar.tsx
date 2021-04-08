import React from 'react';
import styles from '../styles/NavBar.module.scss';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <header id={styles.header}>
      <a className={styles.LogoContainer} href="#">
        <img className={styles.logo} src="/gift-box.svg" alt="logo" />{' '}
        droppexmas
      </a>

      <nav>
        <a className={styles.userInfo} href="#">
          <img className={styles.userIcon} src="/user.png" /> Clarance
        </a>
      </nav>
    </header>
  );
};
