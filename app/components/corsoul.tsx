"use client";

import { useEffect, useState } from 'react';
import { mockproducts } from '../data/products';
import '../css-components/hero.css';
import Image from 'next/image';

export default function Coursel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const currentProduct = mockproducts[activeIndex];

   useEffect(() => {

     const interval = setInterval(() => {
        setActiveIndex((prev) => (prev+1) % mockproducts.length)
        
    }, 3000);

   return () => {clearInterval(interval)}   
   }, [])



    return (
        <div className="product-container">
            <div className="product-name">
                <h2>{currentProduct.name}</h2>
                <p>{currentProduct.description}</p>
            </div>
            <div className="product-image">
                <Image
                    alt={currentProduct.name}
                    src={currentProduct.image}
                   height={1000}
                   width={1000}
                />
            </div>
           
        </div>
    );
}


