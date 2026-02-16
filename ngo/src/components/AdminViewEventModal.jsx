import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCalendarDays,
  faLocationDot,
  faUsers,
  faPen,
  faSave,
  faImage,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminViewEventModal({
  open,
  onClose,
  eventData,
  refreshEvents,
}) {
  const api = import.meta.env.VITE_API_BASE_URL;

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (eventData) {
      setFormData(eventData);
      setEditMode(false);
      setImagePreview(eventData.image);
      setImageFile(null);
    }
  }, [eventData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (file) => {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ✅ STATUS COLOR
  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (imageFile) data.append("image", imageFile);

      await axios.put(`${api}/event/${formData.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Event updated successfully");
      setEditMode(false);
      refreshEvents();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!eventData) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl mt-12 h-[85vh] md:h-[79vh] "
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.85 }}
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#254151] to-[#3c6e71] p-3 flex justify-between items-center">
              <h2 className="text-white font-semibold text-lg">
                Event Details
              </h2>

              <button onClick={onClose} className="text-white">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* BODY */}
            <div className="grid md:grid-cols-2">
              {/* IMAGE SIDE */}
              <div className="relative h-52 md:h-72 md:h-[520px]">
                <img
                  src={
                    imagePreview ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx532xwGudsXUkqXbTFk4kURNWNnIPJltOow&s"
                  }
                  className="w-full h-full object-cover"
                />

                {editMode && (
                  <label className="absolute bottom-2 right-4 bg-black/70 text-white px-4 py-1 rounded-lg cursor-pointer flex items-center gap-2 text-sm">
                    <FontAwesomeIcon icon={faImage} />
                    Change Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(e.target.files[0])
                      }
                    />
                  </label>
                )}
              </div>

              {/* RIGHT SIDE */}
              <div className="p-5 space-y-2 overflow-y-auto max-h-[520px]">

                {/* TITLE + STATUS */}
                <div className="flex justify-between items-start">
                  {editMode ? (
                    <input
                      name="title"
                      value={formData.title || ""}
                      onChange={handleChange}
                      className="input text-md font-bold w-full"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-[#254151]">
                      {formData.title}
                    </h2>
                  )}

                  {/* STATUS */}
                  {editMode ? (
                    <select
                      name="status"
                      value={formData.status || "Upcoming"}
                      onChange={handleChange}
                      className="input ml-3"
                    >
                      <option>Upcoming</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${statusColor(
                        formData.status
                      )}`}
                    >
                      {formData.status || "Upcoming"}
                    </span>
                  )}
                </div>

                {/* INFO CARDS */}
                <div className="space-y-2">

                  <div className="flex gap-3 items-center bg-gray-50 p-2 rounded-xl">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    {editMode ? (
                      <input
                        type="date"
                        name="dateOfEvent"
                        value={
                          formData.dateOfEvent?.slice(0, 10) || ""
                        }
                        onChange={handleChange}
                        className="input"
                      />
                    ) : (
                      <p>
                        {new Date(
                          formData.dateOfEvent
                        ).toDateString()}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 items-center bg-gray-50 p-2 rounded-xl">
                    <FontAwesomeIcon icon={faLocationDot} />
                    {editMode ? (
                      <input
                        name="location"
                        value={formData.location || ""}
                        onChange={handleChange}
                        className="input"
                      />
                    ) : (
                      <p>{formData.location}</p>
                    )}
                  </div>

                  <div className="flex gap-3 items-center bg-gray-50 p-2 rounded-xl">
                    <FontAwesomeIcon icon={faUsers} />
                    {editMode ? (
                      <input
                        name="participants"
                        value={formData.participants || ""}
                        onChange={handleChange}
                        className="input"
                      />
                    ) : (
                      <p>{formData.participants} Participants</p>
                    )}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <div className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
                    <FontAwesomeIcon icon={faCircleInfo} />
                    Description
                  </div>

                  {editMode ? (
                    <textarea
                      name="content"
                      rows={2}
                      value={formData.content || ""}
                      onChange={handleChange}
                      className="input w-full"
                    />
                  ) : (
                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">
                      {formData.content}
                    </p>
                  )}
                </div>

                {/* BUTTON */}
                <div className="pt-1">
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex gap-2 items-center"
                    >
                      <FontAwesomeIcon icon={faPen} />
                      Edit Event
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-1 rounded-lg flex gap-2 items-center"
                    >
                      <FontAwesomeIcon icon={faSave} />
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
