import Head from 'next/head';
import Footer from './footer';
import Navbar from './navbar';
import 'tailwindcss/tailwind.css';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Crypto Tracker</title>
                <meta name="description" content="Generated by create next app" />
                <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' />
                <meta hid='description' name='description' content='Track the latest updates of all cryptocurrencies' />
                <meta name='format-detection' content='telephone=no' />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col h-full">
                <Navbar />
                <div className="flex-1"><main className="h-full">{children}</main></div>
                <Footer />
            </div>



        </>
    )
}