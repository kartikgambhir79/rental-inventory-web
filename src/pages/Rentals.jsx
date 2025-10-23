import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import { getRentals, returnRental } from "../api/mockApi.js";

export default function Rentals() {
  const [rentals, setRentals] = useState(getRentals());
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [message, setMessage] = useState("");

  // Refresh rentals list
  const refresh = () => setRentals(getRentals());

  // Handle return action
  const doReturn = (id) => {
    if (window.confirm("Mark this rental as returned?")) {
      returnRental(id);
      refresh();
      setMessage("✅ Rental marked as returned successfully!");
      setTimeout(() => setMessage(""), 2500);
    }
  };

  // Filter + Sort logic
  const filteredRentals = rentals
    .filter((r) => {
      const match =
        r.itemName.toLowerCase().includes(search.toLowerCase()) ||
        r.customerName.toLowerCase().includes(search.toLowerCase());
      const statusMatch =
        filterStatus === "All" || r.status === filterStatus.toLowerCase();
      return match && statusMatch;
    })
    .sort((a, b) => {
      if (sortBy === "due") return new Date(a.dueOn) - new Date(b.dueOn);
      if (sortBy === "rented") return new Date(b.rentedOn) - new Date(a.rentedOn);
      return 0;
    });

  // Detect overdue rentals
  const isOverdue = (r) =>
    r.status === "rented" && new Date(r.dueOn) < new Date();

  return (
    <div className="p-4">
      <Header title="Rentals" />

      {/* Search + Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by customer or item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded-md flex-1 min-w-[160px]"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-2 py-1 rounded-md"
        >
          <option>All</option>
          <option>Rented</option>
          <option>Returned</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-2 py-1 rounded-md"
        >
          <option value="">Sort</option>
          <option value="rented">Newest First</option>
          <option value="due">Due Date</option>
        </select>
      </div>

      {/* Success Message */}
      {message && (
        <div className="bg-green-100 text-green-700 border border-green-300 rounded p-2 mb-3">
          {message}
        </div>
      )}

      {/* Rentals Table */}
      <div className="card overflow-x-auto">
        {filteredRentals.length > 0 ? (
          <table className="table w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-3 py-2 text-left">Item</th>
                <th className="px-3 py-2 text-left">Customer</th>
                <th className="px-3 py-2 text-center">Qty</th>
                <th className="px-3 py-2 text-center">Rate</th>
                <th className="px-3 py-2 text-left">Rented On</th>
                <th className="px-3 py-2 text-left">Due</th>
                <th className="px-3 py-2 text-center">Status</th>
                <th className="px-3 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRentals
                .slice()
                .reverse()
                .map((r) => (
                  <tr
                    key={r.id}
                    className={`border-b hover:bg-gray-50 transition ${
                      isOverdue(r) ? "bg-red-50" : ""
                    }`}
                  >
                    <td className="px-3 py-2">{r.itemName}</td>
                    <td className="px-3 py-2">{r.customerName}</td>
                    <td className="px-3 py-2 text-center">{r.qty}</td>
                    <td className="px-3 py-2 text-center">₹{r.rate}</td>
                    <td className="px-3 py-2">
                      {new Date(r.rentedOn).toLocaleString()}
                    </td>
                    <td className="px-3 py-2">
                      {new Date(r.dueOn).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {isOverdue(r) ? (
                        <span className="px-2 py-1 bg-red-200 text-red-800 rounded text-xs font-semibold">
                          Overdue
                        </span>
                      ) : r.status === "rented" ? (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                          Rented
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                          Returned
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {r.status === "rented" && (
                        <button
                          className="btn bg-blue-600 text-white px-3 py-1 rounded text-xs"
                          onClick={() => doReturn(r.id)}
                        >
                          Mark Returned
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 italic p-3">No rentals found.</p>
        )}
      </div>
    </div>
  );
}
