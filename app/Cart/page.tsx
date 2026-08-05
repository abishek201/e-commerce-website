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
    if (!cartItems || !cartItems.length) {
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
      alert("Order placed successfully!");
      clearCart();
    } catch (error: any) {
      setCheckoutMessage(error.message || "Something went wrong");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="cart-page-wrapper">
      {/* Top Navigation & Header */}
      <header className="cart-header">
        <Link href="/products" className="back-link">
          ← Continue Shopping
        </Link>
        <h1 className="cart-title">Your Shopping Cart</h1>
      </header>

      {/* Empty State */}
      {!cartItems || cartItems.length === 0 ? (
        <div className="empty-cart-card">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link href="/products" className="shop-btn">
            Explore Products
          </Link>
        </div>
      ) : (
        /* Main Grid: Left Items List + Right Summary */
        <div className="cart-content-grid">
          {/* Items Section */}
          <div className="cart-items-section">
            <h2 className="section-subtitle">Cart Items ({cartItems.length})</h2>
            <div className="product-list">
              {cartItems.map((item) => (
                <div key={item.product.id} className="product-section">
                  <div className="product-img-container">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="product-img"
                    />
                  </div>

                  <div className="product-info">
                    <h3 className="product-title">{item.product.name}</h3>
                    <p className="product-unit-price">
                      ₹{item.product.price} each
                    </p>
                    <span className="quantity-badge">
                      Qty: <strong>{item.quantity}</strong>
                    </span>
                  </div>

                  <div className="product-action-price">
                    <p className="product-subtotal">
                      ₹{item.product.price * item.quantity}
                    </p>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary-card">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Grand Total</span>
              <span className="total-price">₹{totalPrice}</span>
            </div>

            <div className="action-buttons">
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </button>

              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>

            {checkoutMessage && (
              <div
                className={`message-box ${
                  checkoutMessage.includes("successfully")
                    ? "success"
                    : "error"
                }`}
              >
                {checkoutMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}