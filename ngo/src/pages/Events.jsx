import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
  faUsers,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Events() {
  const events = [
    {
      title: "Free Health Checkup Camp",
      date: "March 12, 2026",
      location: "Hyderabad",
      participants: "250+ People",
      image:
        "https://images.unsplash.com/photo-1580281657527-47c1f7f7f5c4?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Education Awareness Drive",
      date: "April 05, 2026",
      location: "Vijayawada",
      participants: "180+ Students",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Food Donation Program",
      date: "May 20, 2026",
      location: "Visakhapatnam",
      participants: "500+ Beneficiaries",
      image:
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="w-full font-sans">
      {/* ================= HERO ================= */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2000&auto=format&fit=crop"
          alt="events"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 px-6"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Our Events & Campaigns
          </h1>
          <p className="max-w-2xl mx-auto text-white/90">
            Discover the impactful events and community programs we organize to
            uplift lives through healthcare, education, and social welfare.
          </p>
        </motion.div>
      </section>

      {/* ================= UPCOMING EVENTS ================= */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  {event.date}
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FontAwesomeIcon icon={faLocationDot} />
                  {event.location}
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FontAwesomeIcon icon={faUsers} />
                  {event.participants}
                </div>

                <button className="mt-4 w-full bg-[#254151] text-white py-2 rounded-lg hover:bg-orange-500 transition flex items-center justify-center gap-2">
                  View Details
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PAST EVENTS ================= */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Past Event Highlights
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1600&auto=format&fit=crop",
          ].map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt="past event"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="rounded-2xl shadow-md hover:scale-105 transition cursor-pointer object-cover h-64 w-full"
            />
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-[#254151] text-white text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Be Part of Our Next Event
        </motion.h2>

        <p className="max-w-2xl mx-auto text-white/90 mb-6">
          Join us as a volunteer, donor, or participant and help create
          meaningful change in society.
        </p>

        <a href="/volunteer">
                <button className="bg-[#F4CE50] text-[#254151] px-8 py-3 rounded-xl font-semibold hover:bg-orange-400 hover:text-white transition">
                Get Involved
                </button>
        </a>
      </section>
    </div>
  );
}
