import React from "react";

function Cart({ cart, onRemoveFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <div style={{ flex: 1 }}>
      <h2>Cart</h2>
      {cart.length === 0 && <p>No items in cart.</p>}
      {cart.map(item => (
        <div key={item.id} style={{ marginBottom: "0.5rem" }}>
          <span>
            {item.product.name} x {item.quantity} (${item.product.price})
          </span>
          <button style={{ marginLeft: "0.5rem" }} onClick={() => onRemoveFromCart(item.productId)}>
            Remove
          </button>
        </div>
      ))}
      <hr />
      <p><strong>Total:</strong> ${total.toFixed(2)}</p>
    </div>
  );
}

export default Cart;
