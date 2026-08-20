"use client";

import { useCart } from "@/app/context/CartContext";
import { product as ProductType } from "@/app/types/product";
import Image from "next/image";

export default function Productdetail({ product }: { product: ProductType }) {
  const { addToCart } = useCart();

  return (
    <div className="product-detail-card">
      <h2>{product.name}</h2>
      <Image src={product.image} alt={product.name} width={200} height={200} />
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}