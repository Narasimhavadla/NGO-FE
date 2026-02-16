import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminAddVolunteer({ close, refreshVolunteers }) {

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

  const [loading, setLoading] = useState(false);

  // ✅ handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ handle image
  const handleImage = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // ✅ submit volunteer
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await axios.post(`${api}/volunteer`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

    //   alert("Volunteer Added Successfully ✅");
    toast.success("Volunteer added succesfully")

      refreshVolunteers && refreshVolunteers();
      close();

    } catch (err) {
      console.error(err);
        toast.error("Failed to add Volunteer")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      {/* MODAL */}
      <div className="bg-white w-[95%] md:w-[650px] rounded-2xl shadow-xl p-6 h-[70vh] md:h-[85vh] mt-20 overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#254151]">
            Add Volunteer
          </h2>

          <button
            onClick={close}
            className="text-gray-500 hover:text-red-500 text-lg"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-2">

          {/* NAME */}
          <input
            name="name"
            placeholder="Full Name"
            required
            className="input"
            onChange={handleChange}
          />

          {/* EMAIL + PHONE */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="input"
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone"
              required
              className="input"
              onChange={handleChange}
            />
          </div>

          {/* CITY + ROLE */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="city"
              placeholder="City"
              required
              className="input"
              onChange={handleChange}
            />

            <input
              name="role"
              placeholder="Role"
              className="input"
              onChange={handleChange}
            />
          </div>

          {/* STATUS */}
          <select
            name="status"
            className="input"
            onChange={handleChange}
            defaultValue="pending"
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            className="input"
            onChange={handleChange}
          />

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="input"
          />

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#254151] text-white px-5 py-2 rounded-lg hover:bg-[#1b2f3a]"
            >
              {loading ? "Adding..." : "Add Volunteer"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
