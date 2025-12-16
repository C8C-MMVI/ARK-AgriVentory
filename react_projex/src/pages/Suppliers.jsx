import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:8080/api/suppliers";

export default function Suppliers() {
  const { user } = useAuth();

  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  /* =====================
     Fetch suppliers
     ===================== */
  useEffect(() => {
    if (!user?.token) return;

    fetch(API_URL, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch suppliers");
        return res.json();
      })
      .then(setSuppliers)
      .catch(console.error);
  }, [user]);

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  function openAddModal() {
    setEditingSupplier({ name: "", contactInfo: "", address: "" });
    setModalOpen(true);
  }

  function openEditModal(supplier) {
    setEditingSupplier({ ...supplier });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingSupplier(null);
  }

  /* =====================
     Create / Update
     ===================== */
  async function handleSave(e) {
    e.preventDefault();
    if (!user?.token || !editingSupplier) return;

    const isEdit = Boolean(editingSupplier.supplierId);
    const url = isEdit
      ? `${API_URL}/${editingSupplier.supplierId}`
      : API_URL;

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(editingSupplier),
      });

      if (!res.ok) throw new Error("Failed to save supplier");

      const saved = await res.json();

      setSuppliers(prev =>
        isEdit
          ? prev.map(s => (s.supplierId === saved.supplierId ? saved : s))
          : [...prev, saved]
      );

      closeModal();
    } catch (err) {
      console.error(err);
    }
  }

  /* =====================
     Delete
     ===================== */
  async function handleDelete(supplierId) {
    if (!user?.token) return;

    try {
      const res = await fetch(`${API_URL}/${supplierId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (!res.ok) throw new Error("Failed to delete supplier");

      setSuppliers(prev => prev.filter(s => s.supplierId !== supplierId));
    } catch (err) {
      console.error(err);
    }
  }

  /* =====================
     Render
     ===================== */
  return (
    <div className="p-6 font-lexend">
      <h1 className="text-[48px] font-extrabold mb-4 text-black font-nunito uppercase">
        Supplier List
      </h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search suppliers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 border rounded w-64"
        />
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Supplier
        </button>
      </div>

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
              filteredSuppliers.map(supplier => (
                <tr key={supplier.supplierId} className="border-t">
                  <td className="p-3">{supplier.name}</td>
                  <td className="p-3">{supplier.contactInfo}</td>
                  <td className="p-3">{supplier.address}</td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button
                      onClick={() => openEditModal(supplier)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(supplier.supplierId)}
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

      {modalOpen && editingSupplier && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-[#4C763B]">
              {editingSupplier.supplierId ? "Edit Supplier" : "Add Supplier"}
            </h2>

            <form className="space-y-4" onSubmit={handleSave}>
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  value={editingSupplier.name}
                  onChange={e =>
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
                  value={editingSupplier.contactInfo}
                  onChange={e =>
                    setEditingSupplier({ ...editingSupplier, contactInfo: e.target.value })
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
                  onChange={e =>
                    setEditingSupplier({ ...editingSupplier, address: e.target.value })
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
