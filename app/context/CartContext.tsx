"use client";

import React, { createContext, useContext, useState, useEffect } from "react";   // importing react and other necessary modules
import { product as ProductType } from "@/app/types/product";  // importing schema of products

export interface CartItem {
  product: ProductType;                
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];                             
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;

}

// 1. Safe initialization value
const CartContext = createContext<CartContextType | undefined>(undefined);  // context type saved in this variable

export function CartProvider({ children }: { children: React.ReactNode }) { //??
  // 2. State array setup matching correct naming
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");         // this effect used to get items from local storage and send it to cart items 
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    
      localStorage.setItem("cart", JSON.stringify(cartItems));  // this runs when cartitems changes the it stores in the localstorage
    
  }, [cartItems]);

  const addToCart = (product: ProductType) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);  // checks if the product aleredy exist in the cart
      if (existingItem) {           // if exist increase the quantity by one 
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 } // item quantity = 1+1
            : item  
        );
      }
      return [...prevItems, { product, quantity: 1 }]; // if it is new item add product to array by quantity 1
    });
  };


  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === productId);  // checks if the product aleredy exist in the cart
      if (existingItem && existingItem.quantity > 1) {    // if exist decrease the quantity by one 
        return prevItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }  
            : item
        )
      }
       const updated = prevItems.filter((item)=> item.product.id !== productId)
       if(updated.length === 0)
        return updated;

    });
   
  };

  

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  //   Provider wrapper blocks
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);                                          // fiunction to store cart contect inside the use cart
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
