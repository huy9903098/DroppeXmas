import React from 'react';
import { CartItem } from './CartItem';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface CartProps {}

export const Cart: React.FC<CartProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [carData, setCartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://fakestoreapi.com/carts?limit=5');

      setCartData(result.data);
      setLoading(false);
      console.log('result.dat: ', result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        carData.map(function (data) {
          return <CartItem item={data} key={data.id} />;
        })
      )}
    </>
  );
};
