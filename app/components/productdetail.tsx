"use client";

import { useCart } from "@/app/context/CartContext";

export default function Productdetail({ product }: { product: any }) {
  const {  cartItems, addToCart , removeFromCart  } = useCart();

  const curentcartitem = cartItems.find((item)=>item.product.id === product.id)
  const quantityincart = curentcartitem ? curentcartitem.quantity : 0;

  return (
    <div className="product-detail-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-info-container">
        <div className="product-header">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price-tag">₹{product.price}</div>
        </div>

        <div className="divider"></div>

        {product.description && (
          <div className="product-description-section">
            <h2 className="description-label">Description</h2>
            <p className="product-description">{product.description}</p>
          </div>
        )}

       

        <div className="quantity-section">
          <button
            className="remove-from-cart-btn"
            onClick={() => {
              removeFromCart(product.id);
              alert(`${product.name} removed from cart!`);
            }}
          >
            Remove
          </button>
           <p className="qnt">Quantity: {quantityincart}</p>
        </div>

        <div className="action-area">
          <button
            className="add-to-cart-btn"
            onClick={() => {
          addToCart(product);
          
          alert(`${product.name} added to cart!`);
          }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}