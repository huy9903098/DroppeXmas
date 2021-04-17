import React from 'react';
import styles from './NavBar.module.scss';
import Link from 'next/link';
import { GiftBox } from '@utils/icons/index';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <header id={styles.header}>
      <a className={styles.logo} href="/">
        {/* <img className={styles.logo__icon} src="/giftBox.svg" alt="logo" /> */}
        <GiftBox className={styles.logo__icon} />
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
