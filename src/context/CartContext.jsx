import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load the saved cart when the app opens
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save the cart every time it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add a product (or +1 if it is already in the cart)
  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        },
      ];
    });
  }

  function increase(id) {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }

  function decrease(id) {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Shipping: free from $50, otherwise $5
  const FREE_SHIPPING_FROM = 50;
  const shipping = totalPrice === 0 || totalPrice >= FREE_SHIPPING_FROM ? 0 : 5;
  const grandTotal = totalPrice + shipping;
  const amountForFreeShipping = Math.max(0, FREE_SHIPPING_FROM - totalPrice);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increase, decrease, removeFromCart, clearCart, totalItems, totalPrice, shipping, grandTotal, amountForFreeShipping }}
    >
      {children}
    </CartContext.Provider>
  );
}

// A short way to use the cart in any component
export function useCart() {
  return useContext(CartContext);
}