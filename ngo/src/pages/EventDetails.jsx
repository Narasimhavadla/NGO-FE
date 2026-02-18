import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
  faUsers,
  faHandHoldingHeart,
  faArrowLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EventDetails() {
  const { id } = useParams();
  const api = import.meta.env.VITE_API_BASE_URL;

  const [events, setEvents] = useState(null);

  // 🆕 Modal State
  const [showModal, setShowModal] = useState(false);

  // 🆕 Donor Form
  const [donor, setDonor] = useState({
    name: "",
    phone: "",
    email: "",
    amount: 500,
  });

  // ================= FETCH EVENT =================
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${api}/event/${id}`);
        setEvents(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvent();
  }, [id]);

  if (!events) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Event Not Found
      </div>
    );
  }

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setDonor({ ...donor, [e.target.name]: e.target.value });
  };

  // ================= CREATE ORDER =================
  const handlePayment = async () => {
    try {
      if (!donor.name || !donor.phone || !donor.email) {
        alert("Please fill all fields");
        return;
      }

      const orderRes = await axios.post(`${api}/create-order`, {
        donorName: donor.name,
        donorPhone: donor.phone,
        donorEmail: donor.email,
        amount: donor.amount,
        donationFor: events.title,
      });

      const order = orderRes.data.order;

      openRazorpay(order);

      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= RAZORPAY =================
  const openRazorpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "NGO Donation",
      description: events.title,
      order_id: order.id,

      handler: async function (response) {
        await axios.post(`${api}/verify-payment`, response);
        alert("Payment Successful 🎉");
      },

      prefill: {
        name: donor.name,
        email: donor.email,
        contact: donor.phone,
      },

      theme: {
        color: "#254151",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="w-full font-sans bg-gray-50">
      {/* ================= HERO ================= */}
      <section className="relative h-[60vh] flex items-center justify-center text-white text-center">
        <img
          src={
            events?.image ||
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop"
          }
          alt={events?.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 px-6 max-w-3xl"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {events.title}
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="mt-5 bg-[#F4CE50] text-[#254151] px-6 py-2 rounded-xl font-semibold hover:bg-orange-400 hover:text-white transition flex items-center gap-2 mx-auto"
          >
            <FontAwesomeIcon icon={faHandHoldingHeart} />
            Donate Now
          </button>
        </motion.div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-12 px-6 md:px-20 max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3 text-[#254151]">
              About This Event
            </h2>
            <p className="text-gray-700 text-sm">{events.content}</p>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="bg-white p-4 rounded-2xl shadow space-y-5 h-fit">
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-[#F4CE50] text-[#254151] py-2 rounded-xl font-semibold hover:bg-orange-400 hover:text-white transition flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faHandHoldingHeart} />
            Donate Now
          </button>

          <Link to="/events">
            <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Events
            </button>
          </Link>
        </div>
      </section>

      {/* ================= DONATION MODAL ================= */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative"
            >
              {/* CLOSE */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <h2 className="text-xl font-bold mb-4 text-[#254151]">
                Donor Details
              </h2>

              {/* FORM */}
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={donor.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={donor.phone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={donor.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={donor.amount}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />

                <button
                  onClick={handlePayment}
                  className="w-full bg-[#254151] text-white py-2 rounded-xl hover:bg-[#1b2f3a]"
                >
                  Proceed to Pay
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
