import React from 'react';
import styles from './NavBar.module.scss';
import { GiftBox } from '@utils/icons/index';

export const NavBar: React.FC<{}> = ({}) => {
  return (
    <header id={styles.header}>
      <a className={styles.logo} href="/">
        {/* <img className={styles.logo__icon} src="/giftBox.svg" alt="logo" /> */}
        <GiftBox className={styles.logo__icon} />
        droppexmas
      </a>

      <nav>
        <a className={styles.user} href="#">
          <img className={styles.user__icon} src="/user.svg" />{' '}
          <span>User</span>
        </a>
      </nav>
    </header>
  );
};
