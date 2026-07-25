import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const API_BASE = "https://localhost:5001/api"; // match your backend

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const userId = "demo-user"; // replace with real auth later

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then(res => res.json())
      .then(setProducts);

    fetch(`${API_BASE}/cart?userId=${userId}`)
      .then(res => res.json())
      .then(setCart);
  }, []);

  const addToCart = async (productId) => {
    await fetch(`${API_BASE}/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, quantity: 1 })
    });

    const updated = await fetch(`${API_BASE}/cart?userId=${userId}`).then(r => r.json());
    setCart(updated);
  };

  const removeFromCart = async (productId) => {
    await fetch(`${API_BASE}/cart/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, quantity: 1 })
    });

    const updated = await fetch(`${API_BASE}/cart?userId=${userId}`).then(r => r.json());
    setCart(updated);
  };

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      <ProductList products={products} onAddToCart={addToCart} />
      <Cart cart={cart} onRemoveFromCart={removeFromCart} />
    </div>
  );
}

export default App;
