import { useState } from "react";

export default function Suppliers() {
  const [search, setSearch] = useState("");
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "GreenFarm Supply Co.", contact: "09171234567", address: "Quezon City" },
    { id: 2, name: "AgriHarvest Traders", contact: "09981234567", address: "Pasig City" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSave(e) {
    e.preventDefault();

    if (editingSupplier.id) {
      // update
      setSuppliers((prev) =>
        prev.map((s) => (s.id === editingSupplier.id ? editingSupplier : s))
      );
    } else {
      // add new
      setSuppliers((prev) => [
        ...prev,
        { ...editingSupplier, id: Date.now() },
      ]);
    }

    setModalOpen(false);
    setEditingSupplier(null);
  }

  function handleDelete(id) {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  }

  function openAddModal() {
    setEditingSupplier({ name: "", contact: "", address: "" });
    setModalOpen(true);
  }

  function openEditModal(supplier) {
    setEditingSupplier({ ...supplier });
    setModalOpen(true);
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
