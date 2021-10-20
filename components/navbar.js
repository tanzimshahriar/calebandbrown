import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();
    return (
        <nav
            className="w-full sticky top-0 text-lightthree font-thin pb-1 shadow-sm bg-white flex flex-wrap sm:block"
        >
            <div className="sm:absolute flex py-2">
                <div className="px-2 flex items-center justify-center"><Image src="/next-js.svg" alt="Vercel Logo" width={25} height={25} /></div>
                <div className="text-md md:text-2xl font-medium">Crypto Tracker</div>
            </div>
            <div
                className="w-full items-center flex justify-end sm:justify-center text-sm"
            >
                <Link href="/">
                    <a className={"px-4 py-2 text-md sm:text-lg md:text-xl transform hover:scale-110 transition ease-out duration 500" + (router.pathname == "/" ? " font-bold text-irises" : "")}>Home</a>
                </Link>
                <Link href="/trends">
                    <a className={"px-4 py-2 text-md sm:text-lg md:text-xl transform hover:scale-110 transition ease-out duration 500" + (router.pathname == "/trends" ? " font-bold text-irises" : "")}>Trends</a>
                </Link>
            </div>
        </nav>
    )
}