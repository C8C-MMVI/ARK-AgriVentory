import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import POSItem from "./POSItem";
import { TransactionService } from "../../services/TransactionService";
import { TransactionDetailsService } from "../../services/TransactionDetailsService";

export default function POS() {
  const { user } = useAuth();
  const transactionService = TransactionService(user?.token);
  const transactionDetailsService = TransactionDetailsService(user?.token);

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/products", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.token) fetchProducts();
  }, [user]);

  // Add product to cart
  const addToCart = (product, quantity) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Checkout
  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Cart is empty.");

    try {
      // Create Transaction
      const transaction = await transactionService.create({
        userId: user.id,
        transactionDate: new Date().toISOString(),
        totalAmount: cart.reduce((sum, i) => sum + i.listPrice * i.quantity, 0),
      });

      // Create TransactionDetails for each item
      for (const item of cart) {
        await transactionDetailsService.create({
          transactionId: transaction.transactionId,
          productId: item.productId,
          quantity: item.quantity,
          basePrice: item.basePrice,
          listPrice: item.listPrice,
        });
      }

      alert("Transaction completed!");
      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Error processing transaction.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Point of Sales</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <POSItem key={p.productId} product={p} addToCart={addToCart} />
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Cart</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.productId}>
                {item.productName} x {item.quantity} = ₱
                {(item.listPrice * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
