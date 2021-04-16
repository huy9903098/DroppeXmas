import { ProductInterface } from '@utils/types';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styles from './ProductCard.module.scss';
import { Discard } from '@utils/icons/index';

interface ProductCardProps {
  product: any;
  editProduct(id: number, quantity: number, discard: boolean): any;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  editProduct,
}) => {
  const { productIdIdentical } = useSelector(
    (state: RootStateOrAny) => state.product
  );
  const [discard, setDiscard] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setDiscard(product.discard);
  }, []);
  const discountRatio =
    productIdIdentical[product.id] > 1
      ? productIdIdentical[product.id] / 10
      : 0;
  const toggleDiscard = () => {
    setDiscard(!discard);
    editProduct(product.id, product.quantity, !discard);
  };
  return (
    <div key={product.id} className={styles.product__container}>
      <div className={styles.product__image}>
        <img src={product.image} />
      </div>
      <div className={styles.product__info}>
        <div>
          <h2>{product.title}</h2>
          <p>${product.price}</p>
          <p>{product.category}</p>
        </div>
      </div>
      <div className={styles.product__discard}>
        <Discard
          className={styles.product__discard__icon}
          onClick={toggleDiscard}
        />
      </div>

      <div>
        {
          <input
            type="number"
            min={0}
            value={product.quantity}
            onChange={(e) => {
              if (parseInt(e.target.value) === 0) {
                setDiscard(true);
              }

              editProduct(
                product.id,
                parseInt(e.target.value),
                parseInt(e.target.value) === 0 ? true : false
              );
            }}
          />
        }
      </div>
      <div>
        ${(product.price * product.quantity).toFixed(2)} $
        {(product.price * product.quantity * discountRatio).toFixed(2)}
      </div>
      <div
        className={
          showMore ? styles.product__desc__show : styles.product__desc__hide
        }
      >
        Description: {product.description}
      </div>
      <div
        className={styles.product__showmore}
        onClick={() => setShowMore(!showMore)}
      >
        Show more
      </div>
    </div>
  );
};
