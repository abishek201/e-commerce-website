"use client"
import { useState } from 'react';
import { mockproducts } from '../data/products';
import Link from 'next/link';
import Image from 'next/image';
import './page.css';


export default function ProductsPage() {
    const [searchterm , setsearchterm] = useState("")
  

    const filterproducts = mockproducts.filter((product) => {
        const term = searchterm.toLowerCase()
        const namematch = product.name.toLowerCase().includes(term)
        const descriptionmatch = product.description 
        ? product.description.toLowerCase().includes(term) 
        : false

        return namematch || descriptionmatch ;
       

    });
    
  return (
     <>
    <div className="nav-container">
                <ul>
                   <Link href='/Cart'> <li><Image src="/public/cart-logo.svg" alt="Brand logo" width={40} height={40} /></li></Link>
                    <li>BRAND NAME</li>
                    <li></li>
                </ul>
            </div>
    <div className='search-box'>
        <input type="text" placeholder='search products...' value={searchterm} onChange={(e) => setsearchterm(e.target.value)}></input>
    </div>
 {filterproducts.length > 0 ? (
  
    <div className="products-grid">
      
      {filterproducts.map((product) => (
        <Link  key={product.id} href={`products/${product.id}` }>
       <div className="card-container"  >
          <div className="image-wrapper">
            <Image src={product.image} alt={product.name} height={200} width={200} />
          </div>
          
          <div className="card-content">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
            <span className='btn-view'>view details</span>
           
          </div>
         
        </div></Link>
       
      ))}
    </div>
    ):(
        <div className="no-results">
          <h3>No products found matching {searchterm}</h3>
          <p>Try checking your spelling or searching for something else.</p>
        </div>
      )}
   
  
    
    </>
  );
}