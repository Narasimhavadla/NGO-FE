import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faUser,
  faEnvelope,
  faPhone,
  faIndianRupeeSign,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function DonationPage() {
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");

  const api = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    donationFor: "general",
  });

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handlePresetClick = (amt) => {
    setAmount(amt);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount(e.target.value);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 RAZORPAY PAYMENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Create Order from backend
      const { data } = await axios.post(
        `${api}/create-order`,
        {
          ...form,
          amount,
        }
      );

      const order = data.order;

      // 2️⃣ Razorpay Checkout Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // 🔑 replace
        amount: order.amount,
        currency: "INR",
        name: "NGO Donation",
        order_id: order.id,

        handler: async function (response) {
          // 3️⃣ Verify Payment
          const verifyRes = await axios.post(
            `${api}/verify-payment`,
            {
              ...response,
              ...form,
              amount,
            }
          );

          if (verifyRes.data.success) {
            alert("✅ Donation Successful ❤️");
            window.location.href = "/";
          } else {
            alert("❌ Payment Verification Failed");
          }
        },

        prefill: {
          name: form.donorName,
          email: form.donorEmail,
          contact: form.donorPhone,
        },
 
        theme: {
          color: "#254151",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl grid lg:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE */}
        <div className="bg-[#254151] text-white p-10 flex flex-col justify-center">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3 text-[#F4CE50]">
              <FontAwesomeIcon icon={faHandHoldingHeart} />
              Support Our Mission
            </h1>
            <p className="mt-3">
              Your contribution helps us provide education, healthcare, and hope.
            </p>
          </div>

          <ul className="space-y-3 text-sm">
            <li><FontAwesomeIcon icon={faCheck}/> Food Campaigns</li>
            <li><FontAwesomeIcon icon={faCheck}/> Education</li>
            <li><FontAwesomeIcon icon={faCheck}/> Healthcare</li>
            <li><FontAwesomeIcon icon={faCheck}/> Women Empowerment</li>
          </ul>
        </div>

        {/* FORM */}
        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Amount */}
            <div>
              <label className="font-semibold">
                Select Donation Amount
              </label>

              <div className="grid grid-cols-3 gap-3 mt-3">
                {presetAmounts.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => handlePresetClick(amt)}
                    className={`py-2 rounded-lg border
                      ${
                        amount == amt
                          ? "bg-orange-500 text-white"
                          : "hover:bg-orange-100"
                      }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex items-center border rounded-lg px-3">
                <FontAwesomeIcon icon={faIndianRupeeSign} />
                <input
                  type="number"
                  placeholder="Custom Amount"
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full p-2 outline-none"
                />
              </div>
            </div>

            {/* Donor Details */}
            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="donorName"
                placeholder="Full Name"
                required
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />

              <input
                type="email"
                name="donorEmail"
                placeholder="Email Address"
                required
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />

              <input
                type="tel"
                name="donorPhone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                className="border p-2 rounded-lg md:col-span-2"
              />
            </div>

            {/* Donate */}
            <button
              type="submit"
              className="w-full py-3 bg-[#254151] text-white rounded-lg hover:bg-orange-500 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faHandHoldingHeart} />
              Donate ₹{amount || 0}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
