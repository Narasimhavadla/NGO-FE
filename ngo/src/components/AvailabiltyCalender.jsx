import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import {toast} from "react-toastify"

export default function AvailabilityCalender() {

  const API = import.meta.env.VITE_API_BASE_URL;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email : "",
    time: "",
    occasion: "",
    customOccasion: "",
    programType: "",
    customProgram: "",
    message: "",
  });

  // ✅ Fetch booked dates from backend
  useEffect(() => {
    fetchBookedDates();
  }, []);

  const fetchBookedDates = async () => {
    try {
      const res = await axios.get(`${API}/calender/bookings`);
      const dates = res.data.data.map(
        (b) => new Date(b.date)
      );
      setBookedDates(dates);
    } catch (err) {
      console.error("Failed to fetch bookings");
    }
  };

  // ✅ Prevent past date selection
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isBooked = (date) => {
    return bookedDates.some(
      (booked) =>
        booked.toDateString() === date.toDateString()
    );
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (isPastDate(date)) return "past-date";
      if (isBooked(date)) return "booked-date";
      return "available-date";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPastDate(selectedDate)) {
    //   alert("Cannot book past dates ❌");
      toast.warning("Cannot book Past Dates")
      return;
    }

    setLoading(true);

    const finalOccasion =
      formData.occasion === "Other"
        ? formData.customOccasion
        : formData.occasion;

    const finalProgram =
      formData.programType === "Other"
        ? formData.customProgram
        : formData.programType;

    try {
      const res = await axios.post(
        `${API}/calender/book`,
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          time: formData.time,
          date: selectedDate,
          occasion: finalOccasion,
          programType: finalProgram,
          message: formData.message,
        }
      );

      setConfirmedBooking({
        date: selectedDate,
        time: formData.time,
      });
      toast.success(res.data.message)
      setShowSuccessModal(true);
      

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 5000);

      fetchBookedDates(); 
      setFormData({
        name: "",
        phone: "",
        email : "",
        time: "",
        occasion: "",
        customOccasion: "",
        programType: "",
        customProgram: "",
        message: "",
      });

    } catch (err) {
    //   alert(
    //     err.response?.data?.message ||
    //       "Booking failed"
    //   );
    toast.error(err.message?.data?.message)
    }

    setLoading(false);
  };

  const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

  return (
    <div className="w-full md:w-5xl mx-auto flex flex-col md:flex-row gap-10 p-8 bg-gradient-to-r from-[#f0f4f8] to-[#e6f0f3] rounded-3xl shadow-2xl">

      {/* LEFT - CALENDAR */}
      <div className="bg-white p-4 rounded-2xl shadow-lg w-full md:w-1/3">
        <h2 className="text-xl font-bold mb-4 text-[#254151]">
          Select Program Date
        </h2>

        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName}
          tileDisabled={({ date }) => isPastDate(date)}
        />

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            <span>Past Dates</span>
          </div>
        </div>
      </div>

      {/* RIGHT - FORM */}
      <div className="flex-1 bg-white p-4 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#254151]">
          Book a Program
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2">

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              className="input-style"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={formData.phone}
              className="input-style"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                className="input-style md:col-span-2"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
          </div>

          <input
            type="date"
            // value={selectedDate.toISOString().split("T")[0]}
            value={formatDate(selectedDate)}
            readOnly
            className="input-style bg-gray-100"
          />

          <input
            type="time"
            required
            value={formData.time}
            className="input-style"
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
          />

          <select
            required
            value={formData.occasion}
            className="input-style"
            onChange={(e) =>
              setFormData({ ...formData, occasion: e.target.value })
            }
          >
            <option value="">Select Occasion</option>
            <option>Birthday</option>
            <option>Wedding</option>
            <option>Anniversary</option>
            <option>Memorial</option>
            <option value="Other">Other</option>
          </select>

          {formData.occasion === "Other" && (
            <input
              type="text"
              placeholder="Enter Occasion"
              required
              value={formData.customOccasion}
              className="input-style"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customOccasion: e.target.value,
                })
              }
            />
          )}

          <select
            required
            value={formData.programType}
            className="input-style"
            onChange={(e) =>
              setFormData({ ...formData, programType: e.target.value })
            }
          >
            <option value="">Select Program Type</option>
            <option>Blood Donation</option>
            <option>Food Distribution</option>
            <option>Bedsheets Donation</option>
            <option>Education Support</option>
            <option value="Other">Other</option>
          </select>

          {formData.programType === "Other" && (
            <input
              type="text"
              placeholder="Enter Program Type"
              required
              value={formData.customProgram}
              className="input-style"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customProgram: e.target.value,
                })
              }
            />
          )}

          <textarea
            placeholder="Additional Message"
            rows="2"
            value={formData.message}
            className="input-style"
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#254151] text-white py-2 rounded-xl hover:bg-[#1c2f38] transition duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? "Booking..." : "Confirm & Book Slot"}
          </button>

        </form>

            {showSuccessModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-[90%] md:w-[450px] p-8 rounded-3xl shadow-2xl text-center relative animate-fadeIn">

      {/* Success Icon */}
      <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
        <div className="text-4xl text-green-600">✓</div>
      </div>

      <h2 className="text-2xl font-bold text-[#254151] mb-2">
        Booking Confirmed 🎉
      </h2>

      <p className="text-gray-600 mb-4">
        Thank you for scheduling your program with us.
        Our team will contact you soon to coordinate the event details.
      </p>

      <div className="bg-gray-100 rounded-xl p-3 text-sm text-gray-700 mb-4">
        📅 <strong>Date:</strong> {confirmedBooking?.date.toDateString()} <br></br>
        ⏰ <strong>Time:</strong> {confirmedBooking?.time}
      </div>

      <button
        onClick={() => setShowSuccessModal(false)}
        className="bg-[#254151] text-white px-6 py-2 rounded-xl hover:bg-[#1c2f38] transition"
      >
        Close
      </button>
    </div>
  </div>
)}

      </div>

      <style>
        {`
          .input-style {
            width: 100%;
            padding: 6px;
            border-radius: 12px;
            border: 1px solid #d1d5db;
            transition: 0.3s;
          }

          .input-style:focus {
            outline: none;
            border-color: #254151;
            box-shadow: 0 0 0 2px #25415120;
          }

          .booked-date {
            background: #ef4444 !important;
            color: white !important;
            border-radius: 50%;
          }

          .available-date {
            background: #11e960e7;
            border-radius: 50%;
          }

          .past-date {
            background: #d1d5db !important;
            color: #6b7280 !important;
            border-radius: 50%;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }

          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out;
          }

        `}


        
      </style>
    </div>
  );
}