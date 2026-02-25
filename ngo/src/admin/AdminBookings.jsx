import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-calendar/dist/Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCalendar, faCalendarDay, faClock, faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function AdminBookings() {
  const API = import.meta.env.VITE_API_BASE_URL;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch All Bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterByDate(selectedDate);
  }, [selectedDate, allBookings]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API}/calender/bookings`);
      setAllBookings(res.data.data);
    } catch (err) {
      toast.error("Failed to load bookings");
    }
  };

  const filterByDate = (date) => {
    const selected = new Date(date).toDateString();

    const filtered = allBookings.filter(
      (b) => new Date(b.date).toDateString() === selected
    );

    setFilteredBookings(filtered);
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await axios.delete(`${API}/calender/delete/${id}`);
      toast.success("Booking deleted");
      fetchBookings();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const bookingCountOnDate = (date) => {
    return allBookings.filter(
      (b) =>
        new Date(b.date).toDateString() === date.toDateString()
    ).length;
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const count = bookingCountOnDate(date);
      return count > 0 ? (
        <div className="text-xs text-red-600 font-bold">
          {count}
        </div>
      ) : null;
    }
  };



  // Eport to Excel sheet code

   const formatExcelData = (data) => {
    return data.map((b) => ({
      Name: b.name,
      Phone: b.phone,
      Email: b.email,
      Date: new Date(b.date).toLocaleDateString(),
      Time: b.time,
      Occasion: b.occasion || "",
      ProgramType: b.programType || "",
      Message: b.message || "",
    }));
  };

  const exportAllBookings = () => {
    if (allBookings.length === 0) {
      toast.warning("No data to export");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      formatExcelData(allBookings)
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Bookings");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, "All_Bookings.xlsx");
  };

   const exportCurrentMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyData = allBookings.filter((b) => {
      const d = new Date(b.date);
      return (
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      );
    });

    if (monthlyData.length === 0) {
      toast.warning("No bookings this month");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      formatExcelData(monthlyData)
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Current Month"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, "Current_Month_Bookings.xlsx");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">

      <div className="grid md:grid-cols-4 gap-6 mb-2">
  <StatCard
    title="Total Bookings"
    value={allBookings.length}
    icon={<FontAwesomeIcon icon={faCalendar}  />}
    color="bg-blue-100 text-blue-600"
  />

  <StatCard
    title="Today Bookings"
    value={allBookings.filter(
      (b) =>
        new Date(b.date).toDateString() ===
        new Date().toDateString()
    ).length}
    icon={<FontAwesomeIcon icon={faCalendarDay}  />}
    color="bg-green-100 text-green-600"
  />

  <StatCard
    title="Upcoming Events"
    value={allBookings.filter(
      (b) => new Date(b.date) > new Date()
    ).length}
    icon={<FontAwesomeIcon icon={faClock}  />}
    color="bg-yellow-100 text-yellow-600"
  />
</div>

      <div className="flex gap-4 mb-3">
        <button
          onClick={exportCurrentMonth}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Export Current Month
        </button>

        <button
          onClick={exportAllBookings}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Export All Data
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">

        {/* 📅 Calendar */}
        <div className="bg-white p-4 rounded-2xl shadow w-full md:w-1/3">
          <h2 className="text-xl font-bold  text-[#254151]">
            Select Date
          </h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
            className={""}
          />
        </div>

        {/* 📋 Booking List */}
        <div className="flex-1 bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4 text-[#254151]">
            Bookings on {selectedDate.toDateString()}
          </h2>

          {filteredBookings.length === 0 ? (
            <p className="text-gray-500">
              No bookings on this date
            </p>
          ) : (
            <div className="space-y-3">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className=" p-4 rounded-xl shadow-lg hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">
                       <sapn className="opacity-70"><FontAwesomeIcon icon={faUser}/></sapn> {b.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        <sapn className="opacity-70 mr-1"><FontAwesomeIcon icon={faPhone}/></sapn> {b.phone}
                      </p>
                      <p className="text-sm text-gray-600">
                        <sapn className="opacity-70 mr-1"><FontAwesomeIcon icon={faEnvelope}/></sapn> {b.email}
                      </p>
                    </div>

                    <div className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 rounded-xl">
                      {b.time}
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <p><strong>Occasion:</strong> <span className="bg-green-100 text-green-600 px-3 rounded-xl ">{b.occasion}</span></p>
                    <p><strong>Program:</strong> <span className="bg-purple-100 text-purple-600 px-3 rounded-xl "> {b.programType}</span></p>
                    {b.message && (
                      <p><strong>Message:</strong> {b.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 mt-3">
                    {/* <a className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">
                        Whatsapp
                    </a> */}
                    <a
                    href={`https://wa.me/916300157188?text=${encodeURIComponent(
                    ` *NEW PROGRAM BOOKING ALERT*

                    Dear Volunteer Team,

                    A new program has been scheduled. Please review the details below and prepare accordingly.

                    ━━━━━━━━━━━━━━━━━━
                     *Name:* ${b.name}
                     *Phone:* ${b.phone}
                     *Date:* ${new Date(b.date).toDateString()}
                     *Time:* ${b.time}
                     *Occasion:* ${b.occasion}
                     *Program Type:* ${b.programType}
                     *Special Notes:* ${b.message || "No additional message"}
                    ━━━━━━━━━━━━━━━━━━

                     Kindly confirm your availability.
                     Coordinate logistics and required materials.
                     Contact the beneficiary if needed.

                    Thank you for your service `
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                    <FontAwesomeIcon icon={faWhatsapp}/> Notify Volunteers
</a>
                    <a
                      href={`tel:${b.phone}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm"
                    >
                     <FontAwesomeIcon icon={faPhone}/> Call
                    </a>

                    <button
                      onClick={() => deleteBooking(b.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 flex justify-between items-center">
      
      {/* Left Content */}
      <div>
        <h3 className="text-gray-500 text-sm mb-1">
          {title}
        </h3>
        <p className="text-3xl font-bold text-[#254151]">
          {value}
        </p>
      </div>

      {/* Right Icon */}
      <div
        className={`p-4 rounded-full ${color} flex items-center justify-center`}
      >
        {icon}
      </div>
    </div>
  );
}