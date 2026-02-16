import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUser,
  faUserTag,
  faPhone,
  faEnvelope,
  faImage,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminAddTeamModal({
  open,
  onClose,
  refreshTeam,
}) {
  const api = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    phone: "",
    email: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ IMAGE CHANGE
  const handleImageChange = (file) => {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
    if (!formData.name || !formData.designation || !formData.phone) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (imageFile) data.append("image", imageFile);

      await axios.post(`${api}/team/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Team member added ");

      onClose();
      refreshTeam();

      // reset
      setFormData({
        name: "",
        designation: "",
        phone: "",
        email: "",
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      toast.error("Failed to add member");
    } finally {
      setLoading(false);
    }
  };

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
            className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl mt-18"
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.85 }}
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#254151] to-[#3c6e71] p-4 flex justify-between items-center">
              <h2 className="text-white font-semibold text-lg">
                Add Team Member
              </h2>

              <button onClick={onClose} className="text-white">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* BODY */}
            <div className="grid md:grid-cols-2">

              {/* IMAGE SIDE */}
              <div className="relative h-60 md:h-full bg-gray-100 flex items-center justify-center">

                <img
                  src={
                    imagePreview ||
                    "https://via.placeholder.com/300x300?text=Upload+Photo"
                  }
                  className="w-full h-full object-cover"
                />

                <label className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 text-sm">
                  <FontAwesomeIcon icon={faImage} />
                  Upload
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange(e.target.files[0])
                    }
                  />
                </label>
              </div>

              {/* FORM SIDE */}
              <div className="p-6 space-y-4">

                {/* NAME */}
                <div>
                  <label className="text-sm text-gray-600">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>

                {/* DESIGNATION */}
                <div>
                  <label className="text-sm text-gray-600">
                    <FontAwesomeIcon
                      icon={faUserTag}
                      className="mr-2"
                    />
                    Designation *
                  </label>
                  <input
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="text-sm text-gray-600">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    Phone *
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-sm text-gray-600">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="mr-2"
                    />
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>

                {/* BUTTON */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex gap-2 items-center"
                >
                  <FontAwesomeIcon icon={faSave} />
                  {loading ? "Saving..." : "Save Member"}
                </button>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
