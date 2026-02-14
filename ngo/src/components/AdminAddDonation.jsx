import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUser,
  faEnvelope,
  faPhone,
  faIndianRupeeSign,
  faHandHoldingHeart,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function AddDonationModal({
  open,
  setOpen,
  fetchDonations,
}) {
  const api = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    amount: "",
    donationFor: "general",
    payment_method: "cash",
    payment_status: "success",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${api}/offline-payment`,
        form
      );

    //   alert("✅ Donation Added Successfully");
    toast.success("Donation Added")

      // Refresh list
      fetchDonations();

      // Close modal
      setOpen(false);

      // Reset form
      setForm({
        donorName: "",
        donorEmail: "",
        donorPhone: "",
        amount: "",
        donationFor: "general",
        payment_method: "cash",
        payment_status: "success",
      });

    } catch (error) {
      console.error(error);
      alert("❌ Failed to add donation");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b bg-[#254151] text-white">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FontAwesomeIcon icon={faHandHoldingHeart} />
            Add Donation
          </h2>

          <button onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          {/* Name */}
          <div className="flex items-center border rounded-lg px-3">
            <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-400"/>
            <input
              type="text"
              name="donorName"
              placeholder="Donor Name"
              required
              value={form.donorName}
              onChange={handleChange}
              className="w-full p-2 outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border rounded-lg px-3">
            <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-400"/>
            <input
              type="text"
              name="donorPhone"
              placeholder="Phone"
              required
              value={form.donorPhone}
              onChange={handleChange}
              className="w-full p-2 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 md:col-span-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400"/>
            <input
              type="email"
              name="donorEmail"
              placeholder="Email"
              value={form.donorEmail}
              onChange={handleChange}
              className="w-full p-2 outline-none"
            />
          </div>

          {/* Amount */}
          <div className="flex items-center border rounded-lg px-3">
            <FontAwesomeIcon icon={faIndianRupeeSign} className="mr-2 text-gray-400"/>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              required
              value={form.amount}
              onChange={handleChange}
              className="w-full p-2 outline-none"
            />
          </div>

          {/* Donation For */}
          <input
            type="text"
            name="donationFor"
            placeholder="Donation For"
            value={form.donationFor}
            onChange={handleChange}
            className="border rounded-lg px-3 p-2"
          />

          {/* Method */}
          <select
            name="payment_method"
            value={form.payment_method}
            onChange={handleChange}
            className="border rounded-lg px-3 p-2"
          >
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="netbanking">Netbanking</option>
            <option value="cheque">Cheque</option>
          </select>

          {/* Status */}
          <select
            name="payment_status"
            value={form.payment_status}
            onChange={handleChange}
            className="border rounded-lg px-3 p-2"
          >
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* BUTTONS */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-[#254151] text-white rounded-lg flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faMoneyBillWave}/>
              Add Donation
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
