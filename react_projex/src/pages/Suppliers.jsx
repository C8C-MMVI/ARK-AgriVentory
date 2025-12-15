import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Suppliers() {
  const { user } = useAuth(); // user contains { username, token }

  const [search, setSearch] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // Fetch suppliers from backend
  useEffect(() => {
    async function fetchSuppliers() {
      if (!user?.token) return;

      try {
        const res = await fetch("http://localhost:8080/api/suppliers", {
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch suppliers");

        const data = await res.json();
        setSuppliers(data);
      } catch (err) {
        console.error("Failed to fetch suppliers:", err);
      }
    }

    fetchSuppliers();
  }, [user]);

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  function openAddModal() {
    setEditingSupplier({ name: "", contact: "", address: "" });
    setModalOpen(true);
  }

  function openEditModal(supplier) {
    setEditingSupplier({ ...supplier });
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!user?.token) return;

    const method = editingSupplier.id ? "PUT" : "POST";
    const url = editingSupplier.id
      ? `http://localhost:8080/api/suppliers/${editingSupplier.id}`
      : "http://localhost:8080/api/suppliers";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(editingSupplier),
      });

      if (!res.ok) throw new Error("Failed to save supplier");

      const savedSupplier = await res.json();

      setSuppliers((prev) => {
        if (editingSupplier.id) {
          return prev.map((s) => (s.id === savedSupplier.id ? savedSupplier : s));
        } else {
          return [...prev, savedSupplier];
        }
      });

      setModalOpen(false);
      setEditingSupplier(null);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    if (!user?.token) return;

    try {
      const res = await fetch(`http://localhost:8080/api/suppliers/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete supplier");

      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-6 font-lexend">
      <h1 className="text-[48px] font-extrabold mb-4 text-black font-nunito uppercase">
        Supplier List
      </h1>

      {/* Search + Add */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded w-64"
        />
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Supplier
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-[#4C763B] text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-600">
                  No suppliers found.
                </td>
              </tr>
            ) : (
              filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="border-t">
                  <td className="p-3">{supplier.name}</td>
                  <td className="p-3">{supplier.contact}</td>
                  <td className="p-3">{supplier.address}</td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button
                      onClick={() => openEditModal(supplier)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(supplier.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-[#4C763B]">
              {editingSupplier.id ? "Edit Supplier" : "Add Supplier"}
            </h2>

            <form className="space-y-4" onSubmit={handleSave}>
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  value={editingSupplier.name}
                  onChange={(e) =>
                    setEditingSupplier({ ...editingSupplier, name: e.target.value })
                  }
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="font-medium">Contact</label>
                <input
                  type="text"
                  value={editingSupplier.contact}
                  onChange={(e) =>
                    setEditingSupplier({ ...editingSupplier, contact: e.target.value })
                  }
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="font-medium">Address</label>
                <input
                  type="text"
                  value={editingSupplier.address}
                  onChange={(e) =>
                    setEditingSupplier({ ...editingSupplier, address: e.target.value })
                  }
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
