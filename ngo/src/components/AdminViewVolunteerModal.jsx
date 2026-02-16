import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUser,
  faEnvelope,
  faPhone,
  faPen,
  faSave,
  faCity,
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

  // ✅ Load Volunteer Data
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

  // ✅ Image Change
  const handleImageChange = (file) => {
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Update Volunteer
 const handleUpdate = async () => {
  try {
    setLoading(true);

    // Detect status change
    const statusChanged =
      formData.status !== volunteer.status;

    // If ONLY status changed → call status API
    if (statusChanged && !imageFile) {
      await axios.patch(
        `${api}/volunteer-status/${volunteer.id}`,
        { status: formData.status }
      );

      toast.success(
        "Status updated & ID Card sent 📧"
      );

      refreshVolunteers();
      setEditMode(false);
      onClose();
      return;
    }

    // Otherwise → normal update (profile/image)
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (imageFile) {
      data.append("image", imageFile);
    }

    await axios.put(
      `${api}/volunteer/${volunteer.id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Volunteer updated successfully");

    refreshVolunteers();
    setEditMode(false);
    onClose();
  } catch (error) {
    console.error(error);
    toast.error("Update failed ❌");
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
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden h-[58vh] md:h-[85vh] overflow-y-auto mt-18"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* HEADER */}
            <div className="h-20 bg-gradient-to-r from-[#254151] to-[#3c6e71] relative">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-white"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* PROFILE */}
            <div className="flex flex-col items-center -mt-14 px-6">

              {/* IMAGE */}
              <div className="relative">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center border">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-4xl text-gray-400"
                    />
                  </div>
                )}

                {editMode && (
                  <label className="absolute bottom-1 right-1 bg-black/70 text-white p-2 rounded-full cursor-pointer">
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

              {/* NAME */}
              {!editMode ? (
                <h2 className="mt-1 text-xl font-bold text-gray-800 text-center">
                  {formData.name}
                </h2>
              ) : (
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 text-xl font-bold text-center border-b-2 border-[#254151] outline-none"
                />
              )}

              {/* ROLE */}
              {!editMode ? (
                <p className="text-sm text-gray-500">
                  {formData.role || "Volunteer"}
                </p>
              ) : (
                <input
                  value={formData.role}
                  placeholder="Enter role"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value,
                    })
                  }
                  className="text-sm text-center border-b outline-none"
                />
              )}

              {/* STATUS */}
              <div className="mt-1">
                {!editMode ? (
                  <span
                    className={`px-4 py-1 text-xs rounded-full font-medium ${
                      formData.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {formData.status}
                  </span>
                ) : (
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                    className="border rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                )}
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-3 space-y-2">

              {/* EMAIL */}
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  disabled={!editMode}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="bg-transparent outline-none w-full"
                />
              </div>

              {/* PHONE */}
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
                <FontAwesomeIcon icon={faPhone} />
                <input
                  disabled={!editMode}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  className="bg-transparent outline-none w-full"
                />
              </div>

              {/* CITY */}
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
                <FontAwesomeIcon icon={faCity} />
                <input
                  disabled={!editMode}
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      city: e.target.value,
                    })
                  }
                  className="bg-transparent outline-none w-full"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="bg-gray-50 p-2 rounded-xl">
                <textarea
                  disabled={!editMode}
                  value={formData.description}
                  rows={2}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Volunteer description..."
                  className="bg-transparent outline-none w-full"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-2 border-t flex justify-center">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-6 py-1 bg-[#254151] text-white rounded-xl hover:bg-[#1b2f3a] flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faPen} />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-6 py-1 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faSave} />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
