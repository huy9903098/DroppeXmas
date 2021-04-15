import { ProductInterface } from '@utils/types';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: ProductInterface;
  editProduct(id: number, quantity: number): any;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  editProduct,
}) => {
  const { productIdIdentical, loading: productsLoading } = useSelector(
    (state: RootStateOrAny) => state.product
  );
  const discountRatio =
    productIdIdentical[product.id] > 1
      ? productIdIdentical[product.id] / 10
      : 0;
  return (
    <div key={product.id} className={styles.product__container}>
      <div className={styles.product__image}>
        <img src={product.image} />
      </div>
      <div className={styles.product__desc}>
        <div>
          <h2>{product.title}</h2>
          <p>${product.price}</p>
          <p>{product.category}</p>
        </div>
      </div>
      <div>Discard</div>

      <div>
        {
          <input
            type="number"
            min={0}
            value={product.quantity}
            onChange={(e) => editProduct(product.id, parseInt(e.target.value))}
          />
        }
      </div>
      <div>
        ${(product.price * product.quantity).toFixed(2)} $
        {(product.price * product.quantity * discountRatio).toFixed(2)}
      </div>
    </div>
  );
};
