import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faPlus,
  faEye,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminOurTeam() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Dummy API Data (Replace with backend later)
  const [team, setTeam] = useState([
    {
      id: 1,
      name: "Krishna",
      designation: "Founder",
      email: "krishna@gmail.com",
      phone: "6300157188",
      image: "promotions1.webp",
      joined: "2026-02-13",
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

      {/* TEAM TABLE - DESKTOP */
      <div className="bg-white shadow-lg rounded-2xl overflow-x-auto hidden md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-3">Name</th>
              <th className="p-3">Designation</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeam.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3">{m.designation}</td>
                <td className="p-3 break-all">{m.email}</td>
                <td className="p-3">{m.phone}</td>

                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => setSelectedMember(m)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
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

          } 
      <div className="grid gap-4 md:hidden">
        {filteredTeam.map((m) => (
          <div key={m.id} className="bg-white p-4 rounded-xl shadow border">
            <div className="flex items-center gap-3">
              <img
                src={`http://localhost:3000/api/v1/uploads/${m.image}`}
                alt={m.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#254151]"
              />

              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-[#254151] truncate">
                  {m.name}
                </h2>
                <p className="text-sm text-gray-500 truncate">
                  {m.designation}
                </p>
              </div>
            </div>

            <div className="mt-3 text-sm space-y-1">
              <p className="break-all">
                <span className="font-semibold">Email:</span> {m.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {m.phone}
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setSelectedMember(m)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faEye} /> View
              </button>

              <button
                onClick={() => deleteMember(m.id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="flex flex-col items-center text-center">
              <img
                src={`http://localhost:3000/api/v1/uploads/${selectedMember.image}`}
                alt={selectedMember.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-[#254151] shadow-md mb-4"
              />

              <h2 className="text-xl font-bold text-[#254151]">
                {selectedMember.name}
              </h2>

              <p className="text-gray-500 mb-2">
                {selectedMember.designation}
              </p>

              <div className="w-full text-sm space-y-1 mt-3">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedMember.email}
                </p>

                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedMember.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
