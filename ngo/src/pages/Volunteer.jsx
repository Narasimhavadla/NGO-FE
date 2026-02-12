import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHelping,
  faUsers,
  faGlobe,
  faHeart,
  faTimes,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function VolunteerPage() {
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  // FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 Here you can connect API later

    setOpenModal(false);     // Close form modal
    setSuccessModal(true);  // Show success modal
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <div className="relative h-[70vh] w-full">
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600&auto=format&fit=crop"
          alt="volunteer"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-4xl md:text-5xl font-bold mb-6"
          >
            Become a Volunteer
          </motion.h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenModal(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full shadow-lg"
          >
            Volunteer Application
          </motion.button>
        </div>
      </div>

      {/* WHY VOLUNTEER */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Volunteer With Us?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: faHandsHelping,
              title: "Make Impact",
              desc: "Support communities and create real change.",
            },
            {
              icon: faUsers,
              title: "Build Network",
              desc: "Meet like-minded people and leaders.",
            },
            {
              icon: faGlobe,
              title: "Global Exposure",
              desc: "Work on national & international causes.",
            },
            {
              icon: faHeart,
              title: "Give Back",
              desc: "Share your skills for social good.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center"
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="text-yellow-500 text-3xl mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* APPLICATION MODAL */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-center">
                Volunteer Application Form
              </h2>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-4"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="border p-3 rounded-lg w-full"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="border p-3 rounded-lg w-full"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="border p-3 rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="border p-3 rounded-lg w-full"
                />

                <select className="border p-3 rounded-lg w-full md:col-span-2">
                  <option>Select Volunteer Role</option>
                  <option>Teaching</option>
                  <option>Event Management</option>
                  <option>Fundraising</option>
                  <option>Field Work</option>
                </select>

                <textarea
                  placeholder="Why do you want to volunteer?"
                  rows={4}
                  className="border p-3 rounded-lg w-full md:col-span-2"
                />

                <button
                  type="submit"
                  className="md:col-span-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg mt-2"
                >
                  Submit Application
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESS MODAL */}
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
              <button
                onClick={() => setSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-500 text-5xl mb-4"
              />

              <h3 className="text-2xl font-bold mb-2">
                Application Submitted!
              </h3>

              <p className="text-gray-600 mb-6">
                Thank you for volunteering ❤️ <br />
                Our team will contact you soon with further details.
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
    </div>
  );
}
