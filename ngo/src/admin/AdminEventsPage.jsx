import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
  faPlus,
  faEye,
  faTrash,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import AdminAddEventModal from "../components/AdminAddEventModal";
import AdminViewEventModal from "../components/AdminViewEventModal";
import AdminDeleteEventModal from "../components/AdminDeleteEventModal";


export default function AdminEventsPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
const [showViewModal, setShowViewModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);




  // ✅ STATUS FILTER
  const [statusFilter, setStatusFilter] = useState("all");

  // ✅ PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const api = import.meta.env.VITE_API_BASE_URL;

  // ✅ FETCH EVENTS
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${api}/events`);
      setData(res.data.data || []);
    } catch (err) {
      console.log(err);
      setData([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ SEARCH FILTER
  let filteredEvents = data.filter((event) =>
    event.title?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ STATUS FILTER LOGIC
  if (statusFilter !== "all") {
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.status?.toLowerCase() === statusFilter
    );
  }

  // ✅ PAGINATION LOGIC
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;

  const currentRecords = filteredEvents.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredEvents.length / recordsPerPage
  );

  // ✅ EXCEL EXPORT (ALL RECORDS)
  const exportToExcel = () => {
    const excelData = data.map((event) => ({
      Title: event.title,
      Date: new Date(
        event.dateOfEvent
      ).toLocaleDateString(),
      Location: event.location,
      Time : event.time,
      Participants: event.participants,
      Status: event.status || "Upcoming",
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Events"
    );

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([buffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "All_Events.xlsx");
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#254151]">
          Events Management
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search events..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#254151]"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

         <button
          onClick={() => setShowAddEvent(true)}
          className="bg-[#254151] text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Event
        </button>


          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* ✅ STATUS FILTER BUTTONS */}
      

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white shadow rounded-2xl p-5 flex justify-between border-l-3 border-gray-800">
          <div>
            <p>Total Events</p>
            <h2 className="text-2xl font-bold">
              {data.length}
            </h2>
          </div>
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="text-3xl text-[#F4CE50]"
          />
        </div>

        <div className="bg-white shadow rounded-2xl p-5 flex justify-between border-l-3 border-gray-800">
          <div>
            <p>Completed</p>
            <h2 className="text-2xl font-bold">
              {
                data.filter(
                  (e) =>
                    e.status?.toLowerCase() ===
                    "completed"
                ).length
              }
            </h2>
          </div>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-3xl text-green-500 "
          />
        </div>

        <div className="bg-white shadow rounded-2xl p-5 flex justify-between border-l-3 border-gray-800">
          <div>
            <p>Upcoming</p>
            <h2 className="text-2xl font-bold">
              {
                data.filter(
                  (e) =>
                    e.status?.toLowerCase() ===
                    "upcoming"
                ).length
              }
            </h2>
          </div>
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-3xl text-orange-600"
          />
        </div>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        {[
          "all",
          "active",
          "completed",
          "upcoming",
        ].map((status) => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status);
              setCurrentPage(1);
            }}
            className={`px-4 py-1 rounded-lg capitalize ${
              statusFilter === status
                ? "bg-[#254151] text-white"
                : "bg-white border"
              
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="hidden lg:block bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-6 border-b font-semibold">
          All Events
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-4">Event</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.map((event) => (
              <tr key={event.id} className="border-t">
                <td className="p-2  pl-5 font-semibold">
                  {event.title}
                </td>

                <td className="p-2">
                  {new Date(
                    event.dateOfEvent
                  ).toDateString()}
                </td>
                <td className="p-2">{event.time}</td>

                <td className="p-2">
                  {event.location}
                </td>

                <td className="p-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                    {event.status ||
                      "Upcoming"}
                  </span>
                </td>

                <td className="p-2 text-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowViewModal(true);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                    />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     {/* MOBILE */}
<div className="grid gap-4 lg:hidden">
  {currentRecords.map((event) => (
    <div
      key={event.id}
      className="bg-white shadow-md rounded-2xl p-4 space-y-3"
    >
      {/* TITLE */}
      <h2 className="font-bold text-lg text-[#254151]">
        {event.title}
      </h2>

      {/* DATE */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <FontAwesomeIcon icon={faCalendarDays} />
        {new Date(event.dateOfEvent).toLocaleDateString()}
      </div>

      {/* LOCATION */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <FontAwesomeIcon icon={faLocationDot} />
        {event.location}
      </div>

      {/* PARTICIPANTS */}
      <p className="text-sm text-gray-500">
        {event.participants} Participants
      </p>

      {/* STATUS */}
      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
        {event.status || "Upcoming"}
      </span>

      {/* ✅ ACTION BUTTONS */}
      <div className="flex justify-end gap-3 pt-2 border-t">
        {/* VIEW */}
        <button
          onClick={() => {
            setSelectedEvent(event);
            setShowViewModal(true);
          }}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg"
        >
          <FontAwesomeIcon icon={faEye} />
        </button>

        {/* DELETE */}
        <button
          onClick={() => {
            setSelectedEvent(event);
            setShowDeleteModal(true);
          }}
          className="bg-red-600 text-white px-3 py-2 rounded-lg"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>

      </div>
    </div>
  ))}
</div>


      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() =>
            setCurrentPage((p) =>
              Math.max(p - 1, 1)
            )
          }
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() =>
              setCurrentPage(i + 1)
            }
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-[#254151] text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((p) =>
              Math.min(p + 1, totalPages)
            )
          }
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

              <AdminAddEventModal
                open={showAddEvent}
                onClose={() => setShowAddEvent(false)}
                refreshEvents={fetchEvents}
              />


                <AdminViewEventModal
                open={showViewModal}
                onClose={() => setShowViewModal(false)}
                eventData={selectedEvent}
                refreshEvents={fetchEvents}
              />

              <AdminDeleteEventModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                eventData={selectedEvent}
                refreshEvents={fetchEvents}
              />


    </div>
  );
}
