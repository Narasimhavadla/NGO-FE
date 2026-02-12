import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faUsers,
  faUserPlus,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminBeneficiariesPage() {
  const [search, setSearch] = useState("");

  // Dummy Beneficiaries Data
  const beneficiaries = [
    {
      id: 1,
      name: "Anitha Devi",
      age: 32,
      location: "Hyderabad",
      program: "Women Empowerment",
      status: "Active",
    },
    {
      id: 2,
      name: "Ramesh Kumar",
      age: 45,
      location: "Bangalore",
      program: "Food Support",
      status: "Active",
    },
    {
      id: 3,
      name: "Sita Bai",
      age: 28,
      location: "Chennai",
      program: "Education Support",
      status: "Pending",
    },
  ];

  const filteredBeneficiaries = beneficiaries.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#254151]">
          Beneficiaries Management
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search beneficiary..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#254151]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="bg-[#254151] text-white px-4 py-2 rounded-lg hover:bg-[#1f3644] transition flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faUserPlus} />
            Add Beneficiary
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Beneficiaries</p>
            <h2 className="text-xl md:text-2xl font-bold">3</h2>
          </div>
          <FontAwesomeIcon
            icon={faHandHoldingHeart}
            className="text-2xl md:text-3xl text-[#F4CE50]"
          />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Active</p>
            <h2 className="text-xl md:text-2xl font-bold">2</h2>
          </div>
          <FontAwesomeIcon
            icon={faUsers}
            className="text-2xl md:text-3xl text-green-500"
          />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Pending</p>
            <h2 className="text-xl md:text-2xl font-bold">1</h2>
          </div>
          <FontAwesomeIcon
            icon={faUsers}
            className="text-2xl md:text-3xl text-yellow-500"
          />
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white shadow-lg rounded-2xl overflow-x-auto">
        <div className="p-6 border-b font-semibold text-gray-700">
          All Beneficiaries
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Age</th>
              <th className="p-3">Location</th>
              <th className="p-3">Program</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBeneficiaries.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3 font-medium">{b.name}</td>
                <td className="p-3">{b.age}</td>
                <td className="p-3">{b.location}</td>
                <td className="p-3">{b.program}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      b.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="p-3 text-center space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm">
                    <FontAwesomeIcon icon={faEye} />
                  </button>

                  <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {filteredBeneficiaries.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl shadow p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-[#254151]">{b.name}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  b.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {b.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">Age: {b.age}</p>
            <p className="text-sm text-gray-600">Location: {b.location}</p>
            <p className="text-sm text-gray-600">Program: {b.program}</p>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                <FontAwesomeIcon icon={faEye} /> View
              </button>

              <button className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700 transition">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}