import React from 'react';
import styles from '@styles/NavBar.module.scss';
import Link from 'next/link';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <header id={styles.header}>
      <a className={styles.logo} href="/">
        <img className={styles.logo__icon} src="/giftBox.svg" alt="logo" />
        droppexmas
      </a>

      <nav>
        <a className={styles.user} href="#">
          <img className={styles.user__icon} src="/user.svg" /> Clarance
        </a>
      </nav>
    </header>
  );
};
