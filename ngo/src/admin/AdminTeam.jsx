import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faPlus,
  faEye,
  faTrash,
  faTimes,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import AdminAddTeamModal from "../components/AdminAddTeamModal";
import AdminDeleteTeamModal from "../components/AdminDeleteTeamModal"; 
import axios from "axios";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx"
import { saveAs } from "file-saver";


export default function AdminOurTeam() {
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  const [showAddTeam, setShowAddTeam] = useState(false);

  // ✅ DELETE MODAL STATE
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMemberData, setDeleteMemberData] = useState(null);

  const [team, setTeam] = useState([]);

  const api = import.meta.env.VITE_API_BASE_URL;

  // ================= FETCH TEAM =================
  const fetchTeam = async () => {
    try {
      const res = await axios.get(`${api}/team`);
      setTeam(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // ================= SEARCH FILTER =================
  const filteredTeam = team.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) || m.phone.includes(search)
  );

  // ================= OPEN DELETE MODAL =================
  const handleDeleteClick = (member) => {
    setDeleteMemberData(member);
    setShowDeleteModal(true);
  };

  const handlePinToggle = async (member) => {
  try {
    await axios.put(`${api}/team/pin/${member.id}`);
    fetchTeam();
  } catch (err) {
    console.log(err);
  }
};

const eportToExcel = () =>{
  const data = filteredTeam.map((t) => (
    {
      Name : t.name,
      Designation : t.designation,
      Phone : t.phone,
      Email : t.email,
      JoinedAt : new Date(t.createdAt).toLocaleDateString()
    }
  ))

  const ws = XLSX.utils.json_to_sheet(data) 
  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb,ws,"Team Data Report")

  const buffer = XLSX.write(
    wb, {
      bookType : "xlsx",
      type : "array"
    }
  )

  saveAs(
    new Blob([buffer],{
      type : "application/octet-stream"
    }),
    "Team_Members_Report.xlsx"
  )
}


  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* ================= HEADER ================= */}
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
            onClick={() => setShowAddTeam(true)}
            className="bg-[#254151] text-white px-4 py-2 rounded-lg hover:bg-[#1f3644] transition flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Member
          </button>

          <button className="bg-green-500 text-white rounded py-1 flex items-center gap-2 items-center md:px-4"
          onClick={eportToExcel}
          >
            <FontAwesomeIcon icon={faFileExcel} /> Excel
          </button>
        </div>
      </div>

      {/* ================= TEAM TABLE (DESKTOP) ================= */}
      <div className="bg-white shadow-lg rounded-2xl overflow-x-auto hidden md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-2">Pin</th>
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
                <td>
                   <button
                    onClick={() => handlePinToggle(m)}
                    className={`pl-3 ${
                      m.isPinned ? "text-orange-500" : "text-black"
                    }`}
                    title="Pin to top"
                  >
                    <FontAwesomeIcon icon={faThumbtack} />
                  </button>
                </td>
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3">{m.designation}</td>
                <td className="p-3 break-all">{m.email}</td>
                <td className="p-3">{m.phone}</td>

                <td className="p-3 text-center space-x-2">
                  {/* VIEW */}
                  <button
                    onClick={() => setSelectedMember(m)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDeleteClick(m)}
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

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid gap-4 md:hidden">
        {filteredTeam.map((m) => (
          <div key={m.id} className="bg-white p-4 rounded-xl shadow border">
            <div className="flex items-center gap-3">
              <img
                src={m.image}
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
                onClick={() => handleDeleteClick(m)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= VIEW MODAL ================= */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="flex flex-col items-center text-center">
              <img
                src={selectedMember.image}
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

      {/* ================= ADD MODAL ================= */}
      {showAddTeam && (
        <AdminAddTeamModal
          open={showAddTeam}
          onClose={() => setShowAddTeam(false)}
          refreshTeam={fetchTeam}
        />
      )}

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && (
        <AdminDeleteTeamModal
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          selectedMember={deleteMemberData}
          refreshTeam={fetchTeam}
        />
      )}
    </div>
  );
}
