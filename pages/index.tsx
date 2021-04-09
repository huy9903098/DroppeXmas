import Head from 'next/head';
import { Cart } from '../components/Cart/Cart';

import { Layout } from '../components/Layout';
import { NavBar } from '../components/NavBar';
import { TitleBar } from '../components/TitleBar';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/vercel.svg" />
      </Head>

      <Layout>
        <div className={styles.container}>
          <TitleBar></TitleBar>
          <Cart></Cart>
        </div>
      </Layout>
    </>
  );
}
