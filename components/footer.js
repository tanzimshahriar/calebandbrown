import Image from "next/image";
export default function Footer() {
    return (
        <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
        >
            @Copyright Crypto Tracker{' '}
            <span>
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
        </a>
    )
}