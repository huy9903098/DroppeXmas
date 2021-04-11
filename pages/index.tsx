import Head from 'next/head';
import { WishLists } from '@components/WishLists/WishLists';

import { Layout } from '@components/Layout/Layout';
import { TitleBar } from '@components/TitleBar/TitleBar';
import styles from '@styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/vercel.svg" />
      </Head>

      <Layout>
        <TitleBar></TitleBar>
        <WishLists></WishLists>
      </Layout>
    </>
  );
}
