"use client"
import { mockproducts } from "../data/products"
import '../css-components/productdetail.css'
import { product as ProductType } from "@/app/types/product";
import { useCart } from "@/app/context/CartContext";
import Link from 'next/link';
import { useState } from "react";

interface Props{
    product:ProductType;
}

export default function Productdetail({product}:Props){
  const {  cartItems, addToCart , removeFromCart  } = useCart();

  const curentcartitem = cartItems.find((item)=>item.product.id === product.id)
  const quantityincart = curentcartitem ? curentcartitem.quantity : 0;
 

    return(
        <>

        <Link href="/Cart"> <div className="cart-icon">cart</div></Link>
        <div className="image-side" >
             <div className="image-box">
            <img src={product.image} alt={product.name} height={2000} width={2000} />
          </div>
          <div className="detail-side">
          <div className="prod-name"><h1>{product.name}</h1></div>
          <div className="prod-price"><h3>${product.price}</h3></div>
          <div className="prod-description"><h4>{product.description}</h4></div>
          <div className="button-container">
            <p>ADD TO CART:</p>
          <button                                                                                                                                       
          onClick={() => {
          removeFromCart(product.id);
          const isfind = cartItems.some((item)=>item.product.id === product.id)
          if(!isfind){
            alert(`${product.name} product is not  in cart`)
          }else{
            alert(`${product.name} product is removed`)

          }
          
        }}>-</button>
          <span>{quantityincart}</span>
          <button
          onClick={() => {
          addToCart(product);
          
          alert(`${product.name} added to cart!`);
        }}>
            +
          </button>
          </div>
          </div>
          
        </div>
        
        </>
    )
}




