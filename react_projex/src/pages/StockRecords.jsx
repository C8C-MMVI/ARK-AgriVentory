import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:8080/api/stock-records";
const PRODUCT_API_URL = "http://localhost:8080/api/products";
const SUPPLIER_API_URL = "http://localhost:8080/api/suppliers";

export default function StockRecords() {
  const { user } = useAuth();

  const [stockRecords, setStockRecords] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStock, setEditingStock] = useState(null);

  /* =====================
     Fetch stockRecords, products & suppliers
  ===================== */
  useEffect(() => {
    if (!user?.token) return;

    const fetchData = async () => {
      try {
        const [stockRes, productRes, supplierRes] = await Promise.all([
          fetch(API_URL, { headers: { Authorization: `Bearer ${user.token}` } }),
          fetch(PRODUCT_API_URL, { headers: { Authorization: `Bearer ${user.token}` } }),
          fetch(SUPPLIER_API_URL, { headers: { Authorization: `Bearer ${user.token}` } }),
        ]);

        setStockRecords(await stockRes.json());
        setProducts(await productRes.json());
        setSuppliers(await supplierRes.json());
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user]);

  const filteredStock = stockRecords.filter(sr => {
    const productName = products.find(p => Number(p.productId) === Number(sr.productId))?.productName || "";
    return productName.toLowerCase().includes(search.toLowerCase());
  });

  function openAddModal() {
    setEditingStock({
      quantity: 0,
      unitPrice: 0,
      lastUpdated: "",
      productId: "",
      supplierId: "",
    });
    setModalOpen(true);
  }

  function openEditModal(stock) {
    console.log("Opening edit modal with stock:", stock);
    console.log("Available suppliers:", suppliers);
    console.log("Available products:", products);
    
    setEditingStock({
      ...stock,
      productId: String(stock.productId),
      supplierId: String(stock.supplierId),
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingStock(null);
  }

  /* =====================
     Create / Update
  ===================== */
  async function handleSave(e) {
    e.preventDefault();
    if (!user?.token || !editingStock) return;

    const isEdit = Boolean(editingStock.stockRecordId);
    const url = isEdit ? `${API_URL}/${editingStock.stockRecordId}` : API_URL;

    // Ensure IDs are numbers
    const payload = {
      ...editingStock,
      productId: Number(editingStock.productId),
      supplierId: Number(editingStock.supplierId),
    };

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save stock record");

      const saved = await res.json();

      setStockRecords(prev =>
        isEdit
          ? prev.map(sr => (sr.stockRecordId === saved.stockRecordId ? saved : sr))
          : [...prev, saved]
      );

      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error saving stock record. Make sure all fields are filled correctly.");
    }
  }

  /* =====================
     Delete
  ===================== */
  async function handleDelete(stockId) {
    if (!user?.token) return;

    try {
      const res = await fetch(`${API_URL}/${stockId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (!res.ok) throw new Error("Failed to delete stock record");

      setStockRecords(prev => prev.filter(sr => sr.stockRecordId !== stockId));
    } catch (err) {
      console.error(err);
      alert("Error deleting stock record.");
    }
  }

  /* =====================
     Render
  ===================== */
  return (
    <div className="p-6 font-lexend">
      <h1 className="text-[48px] font-extrabold mb-4 text-black font-nunito uppercase">
        Stock Records
      </h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by product..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 border rounded w-64"
        />
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Stock
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-[#4C763B] text-white">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Supplier</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Unit Price</th>
              <th className="p-3 text-left">Last Updated</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStock.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-600">
                  No stock records found.
                </td>
              </tr>
            ) : (
              filteredStock.map(stock => {
                const productName = products.find(p => Number(p.productId) === Number(stock.productId))?.productName || "-";
                const name = suppliers.find(s => Number(s.supplierId) === Number(stock.supplierId))?.name || "-";
                return (
                  <tr key={stock.stockRecordId} className="border-t">
                    <td className="p-3">{productName}</td>
                    <td className="p-3">{name}</td>
                    <td className="p-3">{stock.quantity}</td>
                    <td className="p-3">{stock.unitPrice}</td>
                    <td className="p-3">{stock.lastUpdated}</td>
                    <td className="p-3 flex justify-center space-x-2">
                      <button
                        onClick={() => openEditModal(stock)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(stock.stockRecordId)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && editingStock && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-[#4C763B]">
              {editingStock.stockRecordId ? "Edit Stock" : "Add Stock"}
            </h2>

            {suppliers.length === 0 && (
              <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">
                Warning: Suppliers not loaded yet
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="font-medium">Product</label>
                <select
                  value={editingStock.productId}
                  onChange={e =>
                    setEditingStock({ ...editingStock, productId: e.target.value })
                  }
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Product</option>
                  {products.map(p => (
                    <option key={p.productId} value={String(p.productId)}>
                      {p.productName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-medium">Supplier</label>
                <select
                  value={editingStock.supplierId}
                  onChange={e => {
                    console.log("Selected supplier ID:", e.target.value);
                    setEditingStock({ ...editingStock, supplierId: e.target.value });
                  }}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(s => {
                    console.log("Rendering supplier option:", s.supplierId, s.name);
                    return (
                      <option key={s.supplierId} value={String(s.supplierId)}>
                        {s.name}
                      </option>
                    );
                  })}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Current value: {editingStock.supplierId} (type: {typeof editingStock.supplierId})
                </p>
              </div>

              <div>
                <label className="font-medium">Quantity</label>
                <input
                  type="number"
                  value={editingStock.quantity}
                  onChange={e =>
                    setEditingStock({ ...editingStock, quantity: parseInt(e.target.value) })
                  }
                  required
                  className="w-full border rounded px-3 py-2"
                  min="0"
                />
              </div>

              <div>
                <label className="font-medium">Unit Price</label>
                <input
                  type="number"
                  value={editingStock.unitPrice}
                  onChange={e =>
                    setEditingStock({ ...editingStock, unitPrice: parseFloat(e.target.value) })
                  }
                  required
                  className="w-full border rounded px-3 py-2"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="font-medium">Last Updated</label>
                <input
                  type="date"
                  value={editingStock.lastUpdated}
                  onChange={e =>
                    setEditingStock({ ...editingStock, lastUpdated: e.target.value })
                  }
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}