import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/layout.module.css';
import Footer from './footer';
import Navbar from './navbar';
import 'tailwindcss/tailwind.css';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Crypto Tracker</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}