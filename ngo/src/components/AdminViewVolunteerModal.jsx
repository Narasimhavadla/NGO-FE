import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUser,
  faEnvelope,
  faPhone,
  faPen,
  faSave,
  faCity,
  faUserTag,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ViewVolunteerModal({
  open,
  onClose,
  volunteer,
  refreshVolunteers,
}) {
  const api = import.meta.env.VITE_API_BASE_URL;

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    role: "",
    description: "",
    status: "pending",
  });

  // ✅ Set Volunteer Data
  useEffect(() => {
    if (volunteer) {
      setFormData({
        name: volunteer.name || "",
        email: volunteer.email || "",
        phone: volunteer.phone || "",
        city: volunteer.city || "",
        role: volunteer.role || "",
        description: volunteer.description || "",
        status: volunteer.status || "pending",
      });

      setPreview(volunteer.image || null);
    }
  }, [volunteer]);

  // ✅ Handle Image Change
  const handleImageChange = (file) => {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Update Volunteer (WITH IMAGE)
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append image if changed
      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.put(
        `${api}/volunteer/${volunteer.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Volunteer updated successfully");

      refreshVolunteers();
      setEditMode(false);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const imageUrl =
    preview ||
    (volunteer?.image
      ? `${api}/uploads/${volunteer.image}`
      : null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* MODAL */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden h-[84vh] overflow-y-auto mt-18"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center p-2 border-b">
              <h2 className="text-xl font-semibold text-[#254151] px-4">
                Volunteer Profile
              </h2>

              <button onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-4 grid md:grid-cols-3 gap-6">
              {/* IMAGE SECTION */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow"
                    />
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center border">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-5xl text-gray-400"
                      />
                    </div>
                  )}

                  {/* Upload Button */}
                  {editMode && (
                    <label className="absolute bottom-2 right-2 bg-black/70 text-white p-2 rounded-full cursor-pointer">
                      <FontAwesomeIcon icon={faCamera} />
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

                <h3 className="mt-4 font-semibold text-lg text-center">
                  {formData.name}
                </h3>

                <div className="mt-2 w-full">
                    {!editMode ? (
                        // ✅ VIEW MODE BADGE
                        <span
                        className={`ml-3 px-4 py-1 text-xs rounded-full font-medium 
                            ${
                            formData.status === "active"
                                ? "bg-green-100 text-green-600"
                                : formData.status === "pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-red-100 text-red-600"
                            }`}
                        >
                        <span className="">{formData.status}</span>
                        </span>
                    ) : (
                        // ✅ EDIT MODE DROPDOWN
                        <select
                        value={formData.status}
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            status: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                        </select>
                    )}
                    </div>

              </div>

              {/* DETAILS */}
              <div className="md:col-span-2 space-y-2">
                {[
                  { label: "Email", key: "email", icon: faEnvelope },
                  { label: "Phone", key: "phone", icon: faPhone },
                  { label: "City", key: "city", icon: faCity },
                  { label: "Role", key: "role", icon: faUserTag },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-sm text-gray-500 flex gap-2 items-center">
                      <FontAwesomeIcon icon={field.icon} />
                      {field.label}
                    </label>
                    <input
                      disabled={!editMode}
                      value={formData[field.key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-1 mt-1"
                    />
                  </div>
                ))}

                

                {/* Description */}
                <div>
                  <label className="text-sm text-gray-500">
                    Description
                  </label>
                  <textarea
                    disabled={!editMode}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-1 mt-1"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 p-4 border-t">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faPen} />
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faSave} />
                  {loading ? "Saving..." : "Save"}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
