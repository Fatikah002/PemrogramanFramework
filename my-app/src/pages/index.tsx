import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Praktikum Next.js Pages Router</title>
      </Head>
      <h1>Praktikum Next.js Pages Router</h1> <br />
      <p>Mahasiswa D4 Pengembangan Web</p>
      {/* <nav>
        <h3><Link href="/about">About</Link></h3>
      </nav> */}
    </div>
  );
}
