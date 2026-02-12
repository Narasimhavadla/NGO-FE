import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserCheck,
  faUserClock,
  faUserPlus,
  faEye,
  faTrash,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminVolunteersPage() {
  const [search, setSearch] = useState("");

  // Dummy Volunteers Data
  const volunteers = [
    {
      id: 1,
      name: "Ravi Kumar",
      email: "ravi@gmail.com",
      phone: "9876543210",
      joined: "2026-01-10",
      status: "Active",
    },
    {
      id: 2,
      name: "Sneha Reddy",
      email: "sneha@gmail.com",
      phone: "9123456780",
      joined: "2026-01-22",
      status: "Active",
    },
    {
      id: 3,
      name: "John David",
      email: "john@gmail.com",
      phone: "9012345678",
      joined: "2026-02-02",
      status: "Pending",
    },
  ];

  const filteredVolunteers = volunteers.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#254151]">
          Volunteers Management
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search volunteer..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#254151]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="bg-[#254151] text-white px-4 py-2 rounded-lg hover:bg-[#1b2f3a] transition whitespace-nowrap">
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Add Volunteer
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Volunteers</p>
            <h2 className="text-2xl font-bold">3</h2>
          </div>
          <FontAwesomeIcon
            icon={faUsers}
            className="text-3xl text-[#F4CE50]"
          />
        </div>

        <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Active</p>
            <h2 className="text-2xl font-bold">2</h2>
          </div>
          <FontAwesomeIcon
            icon={faUserCheck}
            className="text-3xl text-green-500"
          />
        </div>

        <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Pending</p>
            <h2 className="text-2xl font-bold">1</h2>
          </div>
          <FontAwesomeIcon
            icon={faUserClock}
            className="text-3xl text-yellow-500"
          />
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-white rounded-2xl shadow overflow-x-auto">
        <div className="p-5 border-b font-semibold text-gray-700">
          All Volunteers
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Joined Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredVolunteers.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3 font-medium">{v.name}</td>
                <td className="p-3">{v.email}</td>
                <td className="p-3">{v.phone}</td>
                <td className="p-3">{v.joined}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      v.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {v.status}
                  </span>
                </td>

                <td className="p-3 text-center space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="grid gap-4 lg:hidden">
        {filteredVolunteers.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-2xl shadow p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-[#254151]">{v.name}</h2>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} /> {v.email}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} /> {v.phone}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  v.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {v.status}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              Joined: <span className="font-medium">{v.joined}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                <FontAwesomeIcon icon={faEye} className="mr-2" /> View
              </button>

              <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}