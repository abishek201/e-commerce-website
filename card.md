# Cart Functionality Explained

This website has a simple shopping cart system. It helps users add products, remove products, and see the total price.

## How the cart works

1. The user opens a product page.
2. The user clicks the plus button.
3. The product is added to the cart.
4. The cart page shows all added products.
5. The user can remove items or clear the whole cart.
6. The cart is saved in the browser, so it stays after refresh.

## Main files involved

### 1. [app/context/CartContext.tsx](app/context/CartContext.tsx)
This is the main cart logic file.

- `useState([])` creates an empty cart at the start.
- `addToCart(product)` adds a product to the cart.
- If the same product is already in the cart, it increases the quantity instead of creating a duplicate.
- `removeFromCart(productId)` removes a product from the cart.
- `clearCart()` removes everything.
- `localStorage` saves the cart in the browser.

### 2. [app/components/productdetail.tsx](app/components/productdetail.tsx)
This file shows the product details and the add/remove buttons.

- The plus button calls `addToCart(product)`.
- The minus button calls `removeFromCart(product)`.
- A popup message appears to let the user know what happened.

### 3. [app/Cart/page.tsx](app/Cart/page.tsx)
This file shows the cart page.

- It reads the products from the cart.
- It calculates the total price.
- It shows the product name, quantity, and price.
- It has buttons to remove items or clear the cart.

### 4. [app/layout.tsx](app/layout.tsx)
This file wraps the whole website with the cart provider.

- `CartProvider` makes the cart available on all pages.

## Very simple flow

1. The app loads.
2. The cart provider starts.
3. The user clicks the plus button.
4. The product is saved in the cart.
5. The cart page shows the item.
6. The user can remove it or clear the cart.

## Simple line-by-line meaning

- `const [cartItems, setCartItems] = useState([]);`
  - This creates the cart list and a function to update it.

- `const addToCart = (product) => { ... }`
  - This function adds a product to the cart.

- `const existingItem = prevItems.find(...)`
  - This checks if the product is already in the cart.

- `return [...prevItems, { product, quantity: 1 }];`
  - This adds a new item to the cart.

- `const removeFromCart = (productId) => { ... }`
  - This removes a selected product from the cart.

- `localStorage.setItem("cart", JSON.stringify(cartItems));`
  - This saves the cart in the browser.

## Small note
The minus button in the product detail page is currently using the product object instead of the product ID. That is a small issue and can be improved later.