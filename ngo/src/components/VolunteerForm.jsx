import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function VolunteerForm({ open, closeModal }) {
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    role: "",
    description: "",
    status: "pending",
    image: null,
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // HANDLE IMAGE
  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      await axios.post(`${api}/volunteer`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);
      closeModal();
      setSuccessModal(true);

      // RESET FORM
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        role: "",
        description: "",
        status: "pending",
        image: null,
      });
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Failed to submit application");
    }
  };

  return (
    <>
      {/* APPLICATION MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative max-h-[85vh] overflow-y-auto mt-18"
            >
              {/* CLOSE */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-center">
                Volunteer Application Form
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full"
                />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full md:col-span-2"
                >
                  <option value="">Select Volunteer Role</option>
                  <option>Teaching</option>
                  <option>Event Management</option>
                  <option>Fundraising</option>
                  <option>Field Work</option>
                </select>

                <textarea
                  name="description"
                  placeholder="Why do you want to volunteer?"
                  rows={2}
                  value={formData.description}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full md:col-span-2"
                />

                {/* IMAGE */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-3 rounded-lg w-full md:col-span-2"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="md:col-span-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg mt-2"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESS CARD */}
      <AnimatePresence>
        {successModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center relative"
            >
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-500 text-5xl mb-4"
              />

              <h3 className="text-2xl font-bold mb-2">
                Application Submitted!
              </h3>

              <p className="text-gray-600 mb-6">
                Thank you for volunteering ❤️ <br />
                Our team will contact you soon.
              </p>

              <button
                onClick={() => setSuccessModal(false)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
