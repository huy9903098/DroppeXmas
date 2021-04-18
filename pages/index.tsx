import Head from 'next/head';
import { WishLists } from '@components/WishLists/WishLists';

import { Layout } from '@components/Layout/Layout';
import { TitleBar } from '@components/TitleBar/TitleBar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Droppexmas</title>
        <link rel="icon" href="/GiftBox.svg" />
      </Head>

      <Layout>
        <TitleBar></TitleBar>
        <WishLists></WishLists>
      </Layout>
    </>
  );
}
