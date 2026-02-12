import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faPlus,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminOurTeam() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Dummy Team Data
  const [team, setTeam] = useState([
    {
      id: 1,
      name: "Ramesh Kumar",
      designation: "Founder",
      email: "ramesh@gmail.com",
      joined: "2023-01-10",
      status: "Active",
    },
    {
      id: 2,
      name: "Sneha Reddy",
      designation: "Program Manager",
      email: "sneha@gmail.com",
      joined: "2023-06-22",
      status: "Active",
    },
    {
      id: 3,
      name: "John David",
      designation: "Volunteer Coordinator",
      email: "john@gmail.com",
      joined: "2024-02-15",
      status: "Pending",
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    designation: "",
    email: "",
  });

  const filteredTeam = team.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const addMember = () => {
    if (!newMember.name || !newMember.designation) return;

    setTeam([
      ...team,
      {
        id: Date.now(),
        ...newMember,
        joined: new Date().toISOString().split("T")[0],
        status: "Active",
      },
    ]);

    setNewMember({ name: "", designation: "", email: "" });
    setShowForm(false);
  };

  const deleteMember = (id) => {
    setTeam(team.filter((m) => m.id !== id));
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#254151] flex items-center gap-2">
          <FontAwesomeIcon icon={faUsers} /> Our Team Management
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search team member..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#254151]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setShowForm(true)}
            className="bg-[#254151] text-white px-4 py-2 rounded-lg hover:bg-[#1f3644] transition flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Member
          </button>
        </div>
      </div>

      {/* ADD MEMBER FORM */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6 grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded-lg"
            value={newMember.name}
            onChange={(e) =>
              setNewMember({ ...newMember, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Designation"
            className="border p-2 rounded-lg"
            value={newMember.designation}
            onChange={(e) =>
              setNewMember({ ...newMember, designation: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-lg"
            value={newMember.email}
            onChange={(e) =>
              setNewMember({ ...newMember, email: e.target.value })
            }
          />

          <div className="md:col-span-3 flex gap-3">
            <button
              onClick={addMember}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Save Member
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* TEAM TABLE */}
      <div className="bg-white shadow-lg rounded-2xl overflow-x-auto hidden md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-3">Name</th>
              <th className="p-3">Designation</th>
              <th className="p-3">Email</th>
              <th className="p-3">Joined</th>
              {/* <th className="p-3">Status</th> */}
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeam.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3">{m.designation}</td>
                <td className="p-3">{m.email}</td>
                <td className="p-3">{m.joined}</td>
                {/* <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      m.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {m.status}
                  </span>
                </td> */}

                <td className="p-3 text-center space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <FontAwesomeIcon icon={faEye} />
                  </button>

                  <button
                    onClick={() => deleteMember(m.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="grid gap-4 md:hidden">
        {filteredTeam.map((m) => (
          <div key={m.id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-bold text-[#254151]">{m.name}</h2>
            <p className="text-sm text-gray-500">{m.designation}</p>
            <p className="text-sm">{m.email}</p>
            <p className="text-xs text-gray-400">Joined: {m.joined}</p>

            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                <FontAwesomeIcon icon={faEye} /> View
              </button>

              <button
                onClick={() => deleteMember(m.id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg"
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
