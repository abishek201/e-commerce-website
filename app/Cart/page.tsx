"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import "./Cart.css";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!cartItems.length) {
      setCheckoutMessage("Your cart is empty.");
      return;
    }

    setIsCheckingOut(true);
    setCheckoutMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, totalPrice }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to place order");
      }

      setCheckoutMessage(`Order placed successfully! ID: ${data.orderId}`);
      alert("order is placed");
      clearCart();
    } catch (error: any) {
      setCheckoutMessage(error.message || "Something went wrong");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Your Shopping Cart</h1>
      <Link
        href="/products"
        style={{ color: "#0070f3", textDecoration: "underline" }}
      >
        ← Continue Shopping
      </Link>

      {!cartItems || cartItems.length === 0 ? (
        <p style={{ marginTop: "2rem" }}>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ marginTop: "2rem" }}>
            {cartItems.map((item) => (
              <div key={item.product.id} className="product-section">
                <div className="product-img">
                  <img src={item.product.image} height={100} width={100} alt={item.product.name}></img>
                </div>
                <div className="product-name">
                  <h3>{item.product.name}</h3>
                  <p>Quantity:{item.quantity}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="price">
                  <p>
                    Price: {item.quantity} × ₹{item.product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2>Grand Total: ₹{totalPrice}</h2>

            <div className="clear-cart-btn">
              <button onClick={clearCart}>Clear Cart</button>
            </div>
            <div className="checkout-btn">
              <button onClick={handleCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? "Processing..." : "Checkout"}
              </button>
              <div>{checkoutMessage ? <p>{checkoutMessage}</p> : null}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}