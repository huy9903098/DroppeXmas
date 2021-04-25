import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styles from './ProductCard.module.scss';
import { Discard } from '@utils/icons/index';
import { ProductInterface } from '@utils/types';

interface ProductCardProps {
  product: ProductInterface;
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
  }, [product.discard]);

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
      <div
        className={`${styles.product__image} ${
          discard ? styles.disabled : null
        }`}
      >
        <img data-testid="product-img" src={product.image} />
      </div>
      <div
        className={`${styles.product__info} ${
          discard ? styles.disabled : null
        }`}
      >
        <div>
          <h2>{product.title}</h2>
          <p data-testid="product-price" className={styles.price}>
            ${product.price}
          </p>
          <a href="#">{product.category}</a>
        </div>
      </div>
      <div
        className={`${styles.product__discard} ${
          discard ? styles.disabled : null
        }`}
      >
        <Discard
          className={styles.product__discard__icon}
          onClick={toggleDiscard}
        />
      </div>

      <div className={styles.product__quantity}>
        <input
          onClick={() => {
            const newQty = product.quantity + 1;
            editProduct(product.id, newQty, discard);
          }}
          className={`${styles.button} ${styles.btnInputSquare}`}
          type="button"
          value="+"
        />
        <input
          type="number"
          required
          className={`${styles.btnInputSquare} ${styles.product__quantity__input}`}
          inputMode="numeric"
          min={0}
          value={product.quantity}
          onChange={(e) => {
            editProduct(
              product.id,
              e.target.value ? parseInt(e.target.value) : 0,
              discard
            );
          }}
        />
        <input
          onClick={() => {
            const newQty = product.quantity !== 0 ? product.quantity - 1 : 0;
            editProduct(product.id, newQty, discard);
          }}
          className={`${styles.button} ${styles.btnInputSquare}`}
          type="button"
          value="-"
        />
      </div>
      <div
        className={`${discard ? styles.disabled : null} ${
          styles.product__price
        } ${styles.h4resp}`}
      >
        {discountRatio !== 0 ? (
          <>
            <p className={styles.disablePrice}>
              ${(product.price * product.quantity).toFixed(2)}
            </p>

            <p>
              $
              {(product.price * product.quantity * (1 - discountRatio)).toFixed(
                2
              )}
            </p>
            <input
              className={`${styles.discount} ${styles.btnInputSquare}`}
              type="button"
              value={`${discountRatio * 100} %`}
            />
          </>
        ) : (
          <p>${(product.price * product.quantity).toFixed(2)}</p>
        )}
      </div>
      <div
        className={
          showMore ? styles.product__desc__show : styles.product__desc__hide
        }
      >
        <b>Description:</b> {product.description}
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
