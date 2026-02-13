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
import VolunteerForm from "../components/VolunteerForm";

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

     <VolunteerForm
      open={openModal}
      closeModal={() => setOpenModal(false)}
    />


    </div>
  );
}
