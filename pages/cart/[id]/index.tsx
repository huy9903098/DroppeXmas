import Head from 'next/head';
import React, { useEffect } from 'react';
import { CheckoutCard } from '@components/CheckoutCard';
import { Layout } from '@components/Layout';
import { TitleBar } from '@components/TitleBar';
import styles from '@styles/Cart.module.scss';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@store/actions/userAction';
import { fetchCart } from '@store/actions/cartAction';

const cart = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  useEffect(() => {
    if (!router.isReady) return;
    dispatch(fetchUser(intId));
    dispatch(fetchCart(intId));
  }, [router.isReady]);
  return (
    <>
      <Head>
        <title>USERS'S wishlist </title>
        <link rel="icon" href="/vercel.svg" />
      </Head>

      <Layout>
        <div className={styles.container}>
          <TitleBar></TitleBar>
          <CheckoutCard />
        </div>
      </Layout>
    </>
  );
};

export default cart;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
