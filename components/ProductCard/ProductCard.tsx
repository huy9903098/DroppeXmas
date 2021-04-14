import { ProductInterface } from '@utils/types';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: ProductInterface;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { productIdIdentical, loading: productsLoading } = useSelector(
    (state: RootStateOrAny) => state.product
  );
  const discountRatio = productIdIdentical[product.id] / 10;
  return (
    <div key={product.id} className={styles.product__container}>
      <div className={styles.product__image}>
        <img src={product.image} />
      </div>
      <div className={styles.product__desc}>
        <div>
          <h2>{product.title}</h2>
          <p>$ {product.price}</p>
          <p>{product.category}</p>
        </div>
      </div>
      <div>Discard</div>

      <div>
        <input type="number" min={0} value={product.quantity} />
      </div>
      <div>
        ${product.price * product.quantity} $
        {product.price * product.quantity * discountRatio}
      </div>
    </div>
  );
};
