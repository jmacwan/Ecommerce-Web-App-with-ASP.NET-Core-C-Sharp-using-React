import React from "react";

function ProductList({ products, onAddToCart }) {
  return (
    <div style={{ flex: 2 }}>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>${p.price}</p>
          <button onClick={() => onAddToCart(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
