import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faUsers,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminDonationsPage() {
  const [search, setSearch] = useState("");

  // Dummy Donations Data
  const donations = [
    {
      id: 1,
      name: "Ravi Kumar",
      email: "ravi@gmail.com",
      amount: 5000,
      date: "2026-02-01",
      method: "UPI",
      status: "Completed",
    },
    {
      id: 2,
      name: "Sneha Reddy",
      email: "sneha@gmail.com",
      amount: 2500,
      date: "2026-02-05",
      method: "Card",
      status: "Completed",
    },
    {
      id: 3,
      name: "John David",
      email: "john@gmail.com",
      amount: 10000,
      date: "2026-02-07",
      method: "Net Banking",
      status: "Pending",
    },
  ];

  const filteredDonations = donations.filter((donation) =>
    donation.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#254151]">
          Donations Management
        </h1>

        <input
          type="text"
          placeholder="Search donor name..."
          className="w-full sm:w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#254151]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Donations</p>
            <h2 className="text-xl font-bold">₹17,500</h2>
            <p className="opacity-60 text-xs">in this month</p>
          </div>
          <FontAwesomeIcon
            icon={faHandHoldingHeart}
            className="text-2xl text-[#F4CE50]"
          />
        </div>

        <div className="bg-white shadow rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Donors</p>
            <h2 className="text-xl font-bold">3</h2>
          </div>
          <FontAwesomeIcon
            icon={faUsers}
            className="text-2xl text-[#F4CE50]"
          />
        </div>
      </div>

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="lg:hidden space-y-4">
        {filteredDonations.map((donation) => (
          <div
            key={donation.id}
            className="bg-white rounded-2xl shadow p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-[#254151]">
                {donation.name}
              </h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  donation.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {donation.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">{donation.email}</p>

            <div className="grid grid-cols-2 gap-2 text-sm mt-2">
              <p>
                <span className="font-medium">Amount:</span> ₹
                {donation.amount}
              </p>
              <p>
                <span className="font-medium">Method:</span>{" "}
                {donation.method}
              </p>
              <p>
                <span className="font-medium">Date:</span> {donation.date}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm">
                <FontAwesomeIcon icon={faEye} /> View
              </button>

              <button className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== DESKTOP TABLE ===== */}
      <div className="hidden lg:block bg-white shadow-lg rounded-2xl overflow-x-auto mt-6">
        <div className="p-6 border-b font-semibold text-gray-700">
          All Donations
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-3">Donor</th>
              <th className="p-3">Email</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Method</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDonations.map((donation) => (
              <tr
                key={donation.id}
                className="border-b hover:bg-gray-50 text-sm"
              >
                <td className="p-3 font-medium">{donation.name}</td>
                <td className="p-3">{donation.email}</td>
                <td className="p-3 font-semibold text-[#254151]">
                  ₹{donation.amount}
                </td>
                <td className="p-3">{donation.date}</td>
                <td className="p-3">{donation.method}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      donation.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>

                <td className="p-3 text-center space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                    <FontAwesomeIcon icon={faEye} />
                  </button>

                  <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}