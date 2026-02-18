import { useState, useEffect, use } from "react";
import axios from "axios";
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
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import DeleteVolunteerModal from "../components/AdminVolDelModal";
import ViewVolunteerModal from "../components/AdminViewVolunteerModal";
import AdminAddVolunteer from "../components/AdminAddVolunteer";
import * as XLSX from "xlsx"
import {saveAs} from "file-saver"

export default function AdminVolunteersPage() {
  const [search, setSearch] = useState("");
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [showAddVolunteer,setShowAddVolunteer] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage , setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const api = import.meta.env.VITE_API_BASE_URL;

  // ✅ FETCH ALL VOLUNTEERS
  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(`${api}/volunteers`);
      setVolunteers(res.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch volunteers", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  // ✅ DELETE VOLUNTEER
  const handleDelete = (id) => {
    setShowDeleteModal(true);

  };

const sortedVolunteers = [...volunteers].sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);


  // ✅ SEARCH FILTER
const filteredVolunteers = sortedVolunteers.filter((v) => {
  const matchesSearch =
    v.name?.toLowerCase().includes(search.toLowerCase()) ||
    v.phone?.includes(search);

  const matchesStatus =
    statusFilter === "all" || v.status === statusFilter;

  return matchesSearch && matchesStatus;
});


  // ✅ STATS
  const total = volunteers.length;
  const active = volunteers.filter((v) => v.status === "active").length;
  const pending = volunteers.filter((v) => v.status === "pending").length;

// const rowsPerPage = 10;

const indexOfLast = currentPage * rowsPerPage;
const indexOfFirst = indexOfLast - rowsPerPage;

const currentVolunteers = filteredVolunteers.slice(
  indexOfFirst,
  indexOfLast
);

const totalPages = Math.ceil(
  filteredVolunteers.length / rowsPerPage
);



const exportCurrentPage = () => {
    const data = currentVolunteers.map((v) => ({
      Name: v.name,
      Email: v.email,
      Phone: v.phone,
      City : v.city,
      Role : v.role,
      Status: v.status,
      JoinedDate: new Date(v.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Current Page");

    const buffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      "Volunteers_Current_Page.xlsx"
    );
  };

  const exportAllData = () =>{
    const data = filteredVolunteers.map((v) =>({
      Name : v.name,
      Email : v.email,
      Phone : v.phone,
      City : v.city,
      Role : v.role,
      Status : v.status,
      JoinedAt : new Date(v.createdAt).toLocaleDateString()
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"All Data")

    const buffer = XLSX.write(wb,{
      bookType : "xlsx",
      type : "array"
    })

    saveAs(
      new Blob([buffer], {
        type : "application/octet-stream",}),
        "Volunteers_Data_Report.xlsx"
    )
  }

useEffect(() => {
  setCurrentPage(1);
}, [search, statusFilter]);


    


  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-[#254151]">
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

          <button className="bg-[#254151] text-white px-4 py-2 rounded-lg hover:bg-[#1b2f3a] transition whitespace-nowrap" 
            onClick={() => setShowAddVolunteer(true)}
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Add Volunteer
          </button>
          <button className="bg-green-400 px-2 py-1 rounded text-white"
          onClick={exportCurrentPage}> 

              <FontAwesomeIcon icon={faFileExcel}/>
              Current Page
          </button>
          <button className="bg-green-700 px-2 py-1 rounded text-white"
            onClick={exportAllData}>
              <FontAwesomeIcon icon={faFileExcel}/>
              All
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center border-l-3 border-gray-800">
          <div>
            <p className="text-gray-500 text-sm">Total Volunteers</p>
            <h2 className="text-2xl font-bold">{total}</h2>
          </div>
          <FontAwesomeIcon
            icon={faUsers}
            className="text-3xl text-[#F4CE50]"
          />
        </div>

        <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center border-l-3 border-gray-800">
          <div>
            <p className="text-gray-500 text-sm">Active</p>
            <h2 className="text-2xl font-bold">{active}</h2>
          </div>
          <FontAwesomeIcon
            icon={faUserCheck}
            className="text-3xl text-green-500"
          />
        </div>

        <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center border-l-3 border-gray-800">
          <div>
            <p className="text-gray-500 text-sm">Pending</p>
            <h2 className="text-2xl font-bold">{pending}</h2>
          </div>
          <FontAwesomeIcon
            icon={faUserClock}
            className="text-3xl text-yellow-500"
          />
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading volunteers...
        </div>
      ) : (
        <>

        <div className="flex flex-wrap gap-3 mb-4 justify-end">

              {/* ALL */}
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1 rounded text-white ${
                  statusFilter === "all"
                    ? "bg-[#254151]"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              >
                All
              </button>

            {/* ACTIVE */}
            <button
              onClick={() => setStatusFilter("active")}
              className={`px-3 py-1 rounded text-white ${
                statusFilter === "active"
                  ? "bg-green-600"
                  : "bg-green-400 hover:bg-green-500"
              }`}
            >
              Active
            </button>

            {/* PENDING */}
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-3 py-1 rounded text-white ${
                statusFilter === "pending"
                  ? "bg-orange-600"
                  : "bg-orange-400 hover:bg-orange-500"
              }`}
            >
              Pending
            </button>

          {/* INACTIVE */}
          <button
            onClick={() => setStatusFilter("inactive")}
            className={`px-3 py-1 rounded text-white ${
              statusFilter === "inactive"
                ? "bg-red-600"
                : "bg-red-400 hover:bg-red-500"
            }`}
          >
            Inactive
          </button>

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
                {currentVolunteers.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b hover:bg-gray-50 text-sm"
                  >
                    <td className="p-3 font-medium">{v.name}</td>
                    <td className="p-3">{v.email}</td>
                    <td className="p-3">{v.phone}</td>
                    <td className="p-3">
                      {new Date(v.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          v.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>

                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedVolunteer(v);
                          setShowViewModal(true);
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>


                      <button
                        onClick={() => {
                          setSelectedVolunteer(v);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-wrap justify-end gap-2 p-4">

  {/* PREV */}
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => prev - 1)}
    className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
  >
    Prev
  </button>

  {/* PAGE NUMBERS */}
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-3 py-1 rounded ${
        currentPage === i + 1
          ? "bg-[#254151] text-white"
          : "bg-gray-300"
      }`}
    >
      {i + 1}
    </button>
  ))}

  {/* NEXT */}
  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((prev) => prev + 1)}
    className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
  >
    Next
  </button>

</div>

          </div>

          {/* MOBILE CARDS */}
          <div className="grid gap-4 lg:hidden">
            {currentVolunteers.map((v) => (
              <div 
                key={v.id}
                className="bg-white rounded-2xl shadow p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-[#254151]">
                      {v.name}
                    </h2>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <FontAwesomeIcon icon={faEnvelope} /> {v.email}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <FontAwesomeIcon icon={faPhone} /> {v.phone}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      v.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {v.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  Joined:{" "}
                  <span className="font-medium">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => {
                          setSelectedVolunteer(v);
                          setShowViewModal(true);
                        }}>
                    <FontAwesomeIcon icon={faEye} className="mr-2" /> View
                  </button>

                

                  <button
                    onClick={() => handleDelete(v.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}


      {showDeleteModal && (
        <DeleteVolunteerModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          volunteer={selectedVolunteer}
          refreshVolunteers={fetchVolunteers}
        />

      )} 

        {showViewModal && (
      <ViewVolunteerModal
        open={showViewModal}
        onClose={() => setShowViewModal(false)}
        volunteer={selectedVolunteer}
        refreshVolunteers={fetchVolunteers}
      />)}


     {showAddVolunteer && (
        <AdminAddVolunteer
          close={() => setShowAddVolunteer(false)}
          refreshVolunteers={fetchVolunteers}
        />
      )}


    </div>
  );
}
