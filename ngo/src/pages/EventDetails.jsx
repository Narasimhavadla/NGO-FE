import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
  faUsers,
  faHandHoldingHeart,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function EventDetails() {
  const { id } = useParams();

  // ===== EVENTS DATA (Replace with API later) =====
  const events = [
    {
      id: "1",
      title: "Free Health Checkup Camp",
      date: "March 12, 2026",
      location: "Hyderabad",
      participants: "250+ People",
      image:
        "https://images.unsplash.com/photo-1580281657527-47c1f7f7f5c4?q=80&w=1600&auto=format&fit=crop",
      description:
        "Our Free Health Checkup Camp is dedicated to providing quality healthcare services to underserved communities. Professional doctors and volunteers will conduct general checkups, eye screenings, BP monitoring, and distribute essential medicines free of cost.",
      impact:
        "250+ beneficiaries will receive free consultations, medicines, and preventive healthcare awareness.",
    },
    {
      id: "2",
      title: "Education Awareness Drive",
      date: "April 05, 2026",
      location: "Hyderabad",
      participants: "180+ Students",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
      description:
        "This program promotes the importance of education among rural children. Activities include motivational sessions, career guidance, book distribution, and interactive workshops.",
      impact:
        "180+ students will benefit through educational kits and mentorship guidance.",
    },
    {
      id: "3",
      title: "Food Donation Program",
      date: "May 20, 2026",
      location: "Hyderabad",
      participants: "500+ Beneficiaries",
      image:
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1600&auto=format&fit=crop",
      description:
        "Our Food Donation Program distributes fresh and nutritious meals to homeless individuals and low‑income families. Volunteers prepare and serve food with dignity and care.",
      impact:
        "500+ people will receive meals and ration support through this initiative.",
    },
  ];

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Event Not Found
      </div>
    );
  }

  return (
    <div className="w-full font-sans bg-gray-50">
      {/* ===== HERO ===== */}
      <section className="relative h-[60vh] flex items-center justify-center text-white text-center">
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 px-6 max-w-3xl"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {event.title}
          </h1>
          <p className="text-white/90">
            Be a part of this impactful initiative and help us bring positive
            change to society.
          </p>

           <button className="w-1/4 mx-auto mt-4 bg-[#F4CE50] text-[#254151] py-2 rounded-xl font-semibold hover:bg-orange-400 hover:text-white transition flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faHandHoldingHeart} />
              Donate Now
            </button>
          
        </motion.div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="py-12 px-6 md:px-20 max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="text-2xl font-bold mb-3 text-[#254151]">
              About This Event
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {event.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="text-2xl font-bold mb-3 text-[#254151]">
              Event Impact
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {event.impact}
            </p>
          </motion.div>
        </div>

        {/* RIGHT SIDEBAR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-4 rounded-2xl shadow space-y-5 h-fit"
        >
          <h3 className="text-xl font-bold text-[#254151]">
            Event Information
          </h3>

          <div className="flex items-center gap-3 text-gray-700">
            <FontAwesomeIcon icon={faCalendarDays} /> {event.date}
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FontAwesomeIcon icon={faLocationDot} /> {event.location}
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FontAwesomeIcon icon={faUsers} /> {event.participants}
          </div>

          {/* ===== DONATE BUTTON ===== */}
          {/* <Link to="/donate"> */}
            <button className="w-full bg-[#F4CE50] text-[#254151] py-2 rounded-xl font-semibold hover:bg-orange-400 hover:text-white transition flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faHandHoldingHeart} />
              Donate Now
            </button>
          {/* </Link> */}

          {/* BACK BUTTON */}
          <Link to="/events">
            <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Events
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
