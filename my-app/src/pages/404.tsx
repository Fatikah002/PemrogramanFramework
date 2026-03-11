import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles.error}>
      <Head>
        <title>404 - Halaman Tidak Ditemukan</title>
      </Head>
      <div className={styles.error__images}>
        <img
          src="/no-data.png"
          alt="Ilustrasi tidak ditemukan"
          className={styles.error__image}
        />
        <img
          src="/page-not-found.png"
          alt="404"
          className={styles.error__image}
        />
      </div>

      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
      <p>Silakan kembali ke halaman utama atau periksa tautan Anda.</p>
      <Link href="/" className={styles.error__button}>
        Kembali ke Home
      </Link>
    </div>
  );
};

export default Custom404;
