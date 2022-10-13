import type { NextPage } from 'next';

import { USER_TYPE } from '../const';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to Product Checkout
      </h1>

      <p className={styles.description}>
        What is your account?
      </p>

      <div data-cy="customers" className={styles.grid}>
        <a href={`/checkout?userType=${USER_TYPE.DEFAULT}`} data-cy="default-customer" className={styles.card}>
          <h2>Default &rarr;</h2>
          <p>Default customer</p>
        </a>

        <a href={`/checkout?userType=${USER_TYPE.MICROSOFT}`} data-cy="microsoft-customer" className={styles.card}>
          <h2>Microsoft &rarr;</h2>
          <p>Microsoft customer</p>
        </a>

        <a href={`/checkout?userType=${USER_TYPE.AMAZON}`} data-cy="amazon-customer" className={styles.card}>
          <h2>Amazon &rarr;</h2>
          <p>Amazon customer</p>
        </a>

        <a href={`/checkout?userType=${USER_TYPE.FACEBOOK}`} data-cy="facebook-customer" className={styles.card}>
          <h2>Facebook &rarr;</h2>
          <p>Facebook customer</p>
        </a>
      </div>
    </div>
  );
}

export default Home
