import React from 'react';
import styles from './SpecialOffer.module.scss';

export const SpecialOffer: React.FC<{}> = ({}) => {
  return (
    <div className={styles.offer}>
      <h1 className={`${styles.h1resp} ${styles.special}`}>Special Offer !</h1>
      <p className={styles.h3resp}>
        Indentical products on different wish list will provide discount
        accordingly:
      </p>
      <p className={styles.h3resp}>
        - 2 identical products chosen ={'>'} 20% reduction for the sum of those
        two items
      </p>
      <p className={styles.h3resp}>
        - 3 identical products chosen ={'>'} 30% reduction for the sum of those
        three items
      </p>
      <p className={styles.h3resp}>
        - 4 identical products chosen ={'>'} 40% reduction for the sum of those
        four items
      </p>
      <p className={styles.h3resp}>Have fun shopping !!!</p>
    </div>
  );
};
