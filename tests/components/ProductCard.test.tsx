import React from 'react';

import { render } from '../test-utils';
import { ProductCard } from '@components/ProductCard/ProductCard';

describe('ProductCard', () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      product: {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: 'men clothing',
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        quantity: 4,
        discard: false,
      },
      editProduct: jest.fn(),
    };
  });

  test('should render props', () => {
    const { getByText, getByTestId } = render(
      <ProductCard {...expectedProps} />
    );
    const title = getByText(expectedProps.product.title);
    const category = getByText(expectedProps.product.category);
    const img = getByTestId('product-img');
    const price = getByTestId('product-price');

    expect(title).toBeVisible();
    expect(category).toBeVisible();
    expect(img.getAttribute('src')).toBe(expectedProps.product.image);
    expect(price.innerHTML).toBe(
      '$' + JSON.stringify(expectedProps.product.price)
    );
  });
});
