import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>Praktikum Next.js Pages Router</h1> 
      <h3>Nama: Fatikah Salsabilla</h3>
      <h3>NIM: 2341720003</h3>
      <h3>Kelas: 3C - TI</h3>
       <nav>
         <h3><Link href="/">Kembali</Link></h3> 
        </nav>
    </div>
  )
  
}