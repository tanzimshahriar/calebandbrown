import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();
    return (
        <nav
            className="w-full z-30 sticky top-0 text-lightthree font-thin pb-1 shadow-sm bg-white flex flex-wrap md:block"
        >
            <div className="md:absolute flex py-2">
                <div className="pl-6 pr-2 flex items-center justify-center"><Image src="/next-js.svg" alt="Vercel Logo" width={25} height={25} /></div>
                <div className="text-md md:text-2xl font-medium">Crypto Tracker</div>
            </div>
            <div
                className="w-full items-center flex justify-end md:justify-center text-sm"
            >
                <Link href="/">
                    <a className={"px-4 py-2 text-md md:text-lg md:text-xl transform hover:scale-110 transition ease-out duration 500" + (router.pathname == "/" ? " font-bold text-irises" : "")}>Home</a>
                </Link>
                <Link href="/volume">
                    <a className={"px-4 py-2 text-md md:text-lg md:text-xl transform hover:scale-110 transition ease-out duration 500" + (router.pathname == "/volume" ? " font-bold text-irises" : "")}>Volume</a>
                </Link>
                <Link href="/global_market">
                    <a className={"px-4 py-2 text-md md:text-lg md:text-xl transform hover:scale-110 transition ease-out duration 500" + (router.pathname == "/global_market" ? " font-bold text-irises" : "")}>Global Market</a>
                </Link>
            </div>
        </nav>
    )
}