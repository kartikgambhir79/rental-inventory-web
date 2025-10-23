import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header.jsx";
import ItemCard from "../components/ItemCard.jsx";
import {
  getItems,
  addItem,
  rentItem,
} from "../api/mockApi.js";

export default function Inventory() {
  const [items, setItems] = useState(getItems());
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "Dress",
    size: "M",
    price: 100,
    qty: 1,
    img: "",
  });

  // Focus input when opening form
  useEffect(() => {
    if (show && inputRef.current) inputRef.current.focus();
  }, [show]);

  // Save item to inventory
  const save = () => {
    if (!form.name.trim() || !form.sku.trim())
      return alert("Name and SKU are required!");
    addItem(form);
    setItems(getItems());
    setShow(false);
    setMessage(`✅ ${form.name} added successfully!`);
    setForm({
      name: "",
      sku: "",
      category: "Dress",
      size: "M",
      price: 100,
      qty: 1,
      img: "",
    });
    setTimeout(() => setMessage(""), 2500);
  };

  // Rent item logic
  const onRent = (item) => {
    const name = prompt("Customer name", "Walk-in") || "Walk-in";
    const qty = Number(prompt("Quantity", "1") || "1");
    const days = Number(prompt("Days", "3") || "1");

    try {
      const due = new Date();
      due.setDate(due.getDate() + days);
      rentItem({
        sku: item.sku,
        customerName: name,
        qty,
        rate: item.price,
        deposit: 200,
        dueOn: due.toISOString(),
      });
      setItems(getItems());
      alert("✅ Item rented successfully!");
    } catch (e) {
      alert(e.message);
    }
  };

  // Filter + Sort Logic
  const filteredItems = items
    .filter(
      (i) =>
        i.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterCategory === "All" || i.category === filterCategory)
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "qty") return a.qty - b.qty;
      return 0;
    });

  return (
    <div className="p-4">
      <Header
        title="Inventory"
        actions={
          <button
            className="btn"
            onClick={() => setShow((s) => !s)}
          >
            {show ? "Close" : "+ Add Item"}
          </button>
        }
      />

      {/* Search + Filter + Sort */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded-md flex-1 min-w-[160px]"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border px-2 py-1 rounded-md"
        >
          <option>All</option>
          <option>Dress</option>
          <option>Suits</option>
          <option>Accessories</option>
          <option>Footwear</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-2 py-1 rounded-md"
        >
          <option value="">Sort</option>
          <option value="price">Price (Low → High)</option>
          <option value="qty">Quantity (Low → High)</option>
        </select>
      </div>

      {/* Success Message */}
      {message && (
        <div className="bg-green-100 text-green-700 border border-green-300 rounded p-2 mb-3">
          {message}
        </div>
      )}

      {/* Add Item Form */}
      {show && (
        <div className="card mb-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
          >
            <div className="field">
              <label>Name</label>
              <input
                ref={inputRef}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="field">
              <label>SKU</label>
              <input
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>Dress</option>
                <option>Suits</option>
                <option>Accessories</option>
                <option>Footwear</option>
              </select>
            </div>
            <div className="field">
              <label>Price</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
            <div className="field">
              <label>Quantity</label>
              <input
                type="number"
                value={form.qty}
                onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })}
              />
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label>Image URL</label>
              <input
                value={form.img}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
                placeholder="https://example.com/item.jpg"
              />
            </div>
          </div>

          {/* Image Preview */}
          {form.img && (
            <div className="mt-3 flex justify-center">
              <img
                src={form.img}
                alt="Preview"
                className="h-32 w-32 object-cover rounded shadow-sm border"
              />
            </div>
          )}

          <div className="mt-4">
            <button className="btn bg-blue-600 text-white px-4 py-1 rounded" onClick={save}>
              Save Item
            </button>
          </div>
        </div>
      )}

      {/* Item Grid */}
      <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2">
        {filteredItems.length > 0 ? (
          filteredItems.map((i) => (
            <ItemCard key={i.id} item={i} onRent={onRent} />
          ))
        ) : (
          <p className="text-gray-500 italic">No items found.</p>
        )}
      </div>
    </div>
  );
}

