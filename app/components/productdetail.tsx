"use client";

import { useCart } from "@/app/context/CartContext";
import { product as ProductType } from "@/app/types/product";

export default function Productdetail({ product }: { product: ProductType }) {
  const { addToCart } = useCart();

  return (
    <div className="product-detail-card">
      <h2>{product.name}</h2>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}