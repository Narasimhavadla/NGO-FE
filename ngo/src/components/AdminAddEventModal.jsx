import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
//   faCalendarDays,
  faLocationDot,
  faUsers,
  faImage,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminAddEventModal({
  open,
  onClose,
  refreshEvents,
}) {
  const api = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    dateOfEvent: "",
    time: "",
    location: "",
    participants: "",
    content: "",
    status: "upcoming",
  });

  const [imageFile, setImageFile] = useState(null);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Image Upload
  const handleImage = (file) => {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ✅ Submit Event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.post(`${api}/event/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Event created successfully ");

      refreshEvents();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* MODAL */}
        <motion.div
          className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden h-[85vh] md:h-[85vh] mt-20"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#254151] to-[#3c6e71] px-5 py-2 flex justify-between items-center">
            <h2 className="text-white font-semibold text-lg">
              Create New Event
            </h2>

            <button onClick={onClose} className="text-white">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* BODY */}
          <div className="flex flex-col md:flex-row">
            
            {/* LEFT SIDE — IMAGE SECTION */}
            <div className="md:w-2/5 bg-gray-50 flex flex-col items-center justify-center p-4 border-r">
              
              <label className="w-full h-44 md:h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faImage}
                      className="text-3xl text-gray-400"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Upload Event Image
                    </p>
                  </>
                )}

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    handleImage(e.target.files[0])
                  }
                />
              </label>

              <p className="text-xs text-gray-400 mt-2 text-center">
                Recommended: 1200 × 600 banner image
              </p>
            </div>

            {/* RIGHT SIDE — FORM */}
            <form
              onSubmit={handleSubmit}
              className="md:w-3/5 p-6 space-y-2"
            >
              {/* TITLE */}
              <input
                name="title"
                placeholder="Event Title"
                required
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#254151] outline-none"
              />

              {/* DATE + TIME */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  name="dateOfEvent"
                  required
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2 outline-none"
                />

                <input
                  type="time"
                  name="time"
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2 outline-none"
                />
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-2 border rounded-xl px-3 py-1">
                <FontAwesomeIcon icon={faLocationDot} />
                <input
                  name="location"
                  placeholder="Location"
                  onChange={handleChange}
                  className="outline-none w-full"
                />
              </div>

              {/* PARTICIPANTS */}
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
                <FontAwesomeIcon icon={faUsers} />
                <input
                  name="participants"
                  placeholder="Participants"
                  onChange={handleChange}
                  className="outline-none w-full"
                />
              </div>

              {/* DESCRIPTION */}
              <textarea
                name="content"
                rows={3}
                placeholder="Event description..."
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-2 outline-none"
              />

              {/* STATUS */}
              <select
                name="status"
                defaultValue="upcoming"
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-2 outline-none"
              >
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>

             

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#254151] text-white py-3 rounded-xl hover:bg-[#1b2f3a] transition"
              >
                <FontAwesomeIcon icon={faSave} />
                {" "}
                {loading ? "Creating..." : "Create Event"}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)
}
