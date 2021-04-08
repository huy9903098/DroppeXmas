import Head from 'next/head';
import { NavBar } from '../components/NavBar';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/vercel.svg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,600,600i,700"
        ></link>
      </Head>

      <div>
        <NavBar />
      </div>
    </div>
  );
}
