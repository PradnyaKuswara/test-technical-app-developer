import type { Metadata } from 'next';
import { poppins } from './fonts';

import 'bootstrap/dist/css/bootstrap.min.css';

import NextTopLoader from 'nextjs-toploader';
import Navbar from './components/navbar';
import BootstrapClient from './components/bootstrapclient';
import { AOSInit } from './libs/aos';

export const metadata = (): Metadata => {
    return {
        title: {
            default: 'Rick and Morty',
            template: '%s | Rick and Morty',
        },
    };
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <AOSInit></AOSInit>
            <head>
                <link
                    href="https://unpkg.com/@webpixels/css@1.2.6/dist/index.css"
                    rel="stylesheet"
                ></link>
            </head>
            <body className={`${poppins.className}`}>
                <div className="p-1 bg-success w-full fixed z-1 top-0"></div>
                <NextTopLoader
                    color="#000"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={true}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                />
                <header>
                    <Navbar />
                </header>

                <main>{children}</main>

                <footer></footer>

                <BootstrapClient />
            </body>
        </html>
    );
}
