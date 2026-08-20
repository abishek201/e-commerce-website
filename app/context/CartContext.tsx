"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { product as ProductType } from "@/app/types/product";

export interface CartItem {
  product: ProductType;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductType, quantity?: number) => void;
  removeFromCart: (productId: number | string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Read directly from localStorage on initial render
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart && savedCart !== "undefined" ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: ProductType, quantityToAdd: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => String(item.product.id) === String(product.id)
      );

      if (existingItem) {
        return prevItems.map((item) =>
          String(item.product.id) === String(product.id)
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      return [...prevItems, { product, quantity: quantityToAdd }];
    });
  };

  const removeFromCart = (productId: number | string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => String(item.product.id) === String(productId)
      );

      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          String(item.product.id) === String(productId)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      return prevItems.filter(
        (item) => String(item.product.id) !== String(productId)
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}