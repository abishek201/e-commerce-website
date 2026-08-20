"use client"


import '../css-components/hero.css';

import Coursel from './corsoul';
import Footer from './footer';
import cartLogo from '@/public/cart-logo.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {



    return (
        <>
            <div className="nav-container">
                <ul>
                   <Link href='/Cart'> <li><Image src={cartLogo} alt="Brand logo" width={40} height={40} /></li></Link>
                    <li>BRAND NAME</li>
                    <li>LOGO</li>
                </ul>
            </div>

            <div className="container">
                <h1>THE SALE IS LIVE</h1>
                <Link href='/products'><button >PRODUCTS</button></Link>
            </div>

            <h2>NEW ARRIVALS</h2>
            <Coursel />
            <div>
                 <Footer />
            </div>

        </>
    );
}

