import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faUsers,
  faLocationDot,
  faPlus,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminEventsPage() {
  const [search, setSearch] = useState("");

  // Dummy Events Data
  const events = [
    {
      id: 1,
      title: "Food Donation Camp",
      date: "2026-03-10",
      location: "Hyderabad",
      volunteers: 45,
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Blood Donation Drive",
      date: "2026-02-20",
      location: "Bangalore",
      volunteers: 60,
      status: "Completed",
    },
    {
      id: 3,
      title: "Clothes Distribution",
      date: "2026-03-05",
      location: "Chennai",
      volunteers: 30,
      status: "Upcoming",
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

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
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="bg-[#254151] text-white px-4 py-2 rounded-lg hover:bg-[#1b2f3a] transition flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faPlus} />
            Add Event
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white shadow rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Events</p>
            <h2 className="text-2xl font-bold">12</h2>
          </div>
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="text-3xl text-[#F4CE50]"
          />
        </div>

        <div className="bg-white shadow rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Upcoming</p>
            <h2 className="text-2xl font-bold">7</h2>
          </div>
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-3xl text-[#F4CE50]"
          />
        </div>

        <div className="bg-white shadow rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Volunteers Joined</p>
            <h2 className="text-2xl font-bold">135</h2>
          </div>
          <FontAwesomeIcon
            icon={faUsers}
            className="text-3xl text-[#F4CE50]"
          />
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-6 border-b font-semibold text-gray-700">
          All Events
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Event</th>
              <th className="p-4">Date</th>
              <th className="p-4">Location</th>
              <th className="p-4">Volunteers</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {filteredEvents.map((event) => (
              <tr key={event.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{event.title}</td>
                <td className="p-4">{event.date}</td>
                <td className="p-4">{event.location}</td>
                <td className="p-4">{event.volunteers}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>

                <td className="p-4 text-center space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                    <FontAwesomeIcon icon={faEye} />
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">
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
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow rounded-2xl p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-[#254151]">{event.title}</h2>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  event.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {event.status}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                {event.date}
              </p>
              <p>
                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                {event.location}
              </p>
              <p>
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                {event.volunteers} Volunteers
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                <FontAwesomeIcon icon={faEye} /> View
              </button>

              <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
