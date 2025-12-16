import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { TransactionService } from "../../services/TransactionService";
import TransactionDetails from "./TransactionDetails";

export default function Transactions() {
  const { user } = useAuth();
  const transactionService = TransactionService(user?.token);

  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const data = await transactionService.getAll();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchTransactions();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>

      {loading && <p>Loading transactions...</p>}

      <ul className="space-y-2">
        {transactions.map((t) => (
          <li key={t.transactionId} className="flex justify-between items-center">
            <button
              onClick={() => setSelectedTransaction(t)}
              className="underline text-blue-600 hover:text-blue-800"
            >
              Transaction #{t.transactionId} - ${t.totalAmount.toFixed(2)}
            </button>
            <span className="text-gray-500">
              {new Date(t.transactionDate).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>

      {selectedTransaction && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">
            Details for Transaction #{selectedTransaction.transactionId}
          </h2>
          <TransactionDetails transactionId={selectedTransaction.transactionId} />
          <button
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => setSelectedTransaction(null)}
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
}
