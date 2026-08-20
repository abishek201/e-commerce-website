"use client";

import { useCart } from "@/app/context/CartContext";
import { CartItem } from "@/app/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div>
          {/* Line 66 fix: Replaced single quote with &apos; */}
          <p>You don&apos;t have any items in your cart yet.</p>
          <Link href="/products">Browse Products</Link>
        </div>
      ) : (
        <div>
          {/* Line 44 fix: Typed item as CartItem instead of any */}
          {cartItems.map((item: CartItem) => (
            <div
              key={item.product.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 0",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={60}
                  height={60}
                  style={{ objectFit: "contain" }}
                />
                <div>
                  <h3>{item.product.name}</h3>
                  <p>₹{item.product.price} × {item.quantity}</p>
                </div>
              </div>

              <button onClick={() => removeFromCart(item.product.id)}>
                Remove
              </button>
            </div>
          ))}

          <div style={{ marginTop: "2rem", textAlign: "right" }}>
            <h2>Total: ₹{subtotal}</h2>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <button onClick={clearCart}>Clear Cart</button>
              <Link href="/checkout">
                <button>Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}