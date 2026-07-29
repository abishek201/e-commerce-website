"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.product.price * item.quantity,0       // equation to add total amount of cart value
    
  );
 
   const handleCheckout = async () => {       // async function to handle the checkout process


    if (!cartItems.length) {
      setCheckoutMessage("Your cart is empty.");
      return;
    }

    setIsCheckingOut(true);
    setCheckoutMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",                                        // post request to send items cart products and total price
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, totalPrice }), //??
      });

      const data = await response.json();

      if (!response.ok) { throw new Error(data.error || "Failed to place order");  // if any error
      }

      setCheckoutMessage(`Order placed successfully! ID: ${data.orderId}`);         // if order is success
      alert("order is placed")
      clearCart();        // clearing the after placing the order
    } catch (error: any) {
      setCheckoutMessage(error.message || "Something went wrong");
    } finally {
      setIsCheckingOut(false);
    }
  };

  


  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Your Shopping Cart</h1>
      <Link href="/products" style={{ color: "#0070f3", textDecoration: "underline" }}>
        ← Continue Shopping
      </Link>

      {cartItems?.length === 0 ? (
        <p style={{ marginTop: "2rem" }}>Your cart is empty.</p>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          {(cartItems).map((item) => (
            <div 
              key={item.product.id} 
              style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                borderBottom: "1px solid #8f5d5dff",
                padding: "1rem 0"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img src={item.product.image} alt={item.product.name} width={60} height={60} />
                <div>
                  <h3 style={{ margin: 0 }}>{item.product.name}</h3>
                  <p style={{ margin: "0.25rem 0", color: "#666" }}>
                    Quantity: {item.quantity} × ₹{item.product.price}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.product.id)}
                style={{
                  backgroundColor: "#ff4444",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1.0rem",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div style={{ marginTop: "2rem", textAlign: "right" }}>
            <h2>Grand Total: ₹{totalPrice}</h2>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
              <button 
                onClick={clearCart}
                style={{ background: "none", border: "1px solid #ccc", padding: "0.5rem 1rem", cursor: "pointer" }}
              >
                Clear Cart
              </button>
             
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
              <button 
               onClick={handleCheckout}
               
                style={{ background: "none", border: "1px solid #ccc", padding: "0.5rem 1rem", cursor: "pointer" }}
              >
                Checkout
              </button>
              <div>
                {checkoutMessage ? (
              <p
                style={{
                  marginTop: "1rem",
                  color: checkoutMessage.startsWith("Order placed") ? "green" : "#b91c1c",
                }}
              >
                {checkoutMessage}
              </p>
            ) : null}

              </div>

             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}