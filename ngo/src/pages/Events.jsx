import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Events() {

  const api = "http://localhost:3000/api/v1";

  /* ================= UPCOMING EVENTS (STATIC) ================= */
  const events = [
    {
      id: 1,
      title: "Free Health Checkup Camp",
      date: "March 12, 2026",
      location: "Hyderabad",
      participants: "250+ People",
      image:
        "https://images.unsplash.com/photo-1580281657527-47c1f7f7f5c4?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Education Awareness Drive",
      date: "April 05, 2026",
      location: "Hyderabad",
      participants: "180+ Students",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Food Donation Program",
      date: "May 20, 2026",
      location: "Hyderabad",
      participants: "500+ Beneficiaries",
      image:
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  /* ================= PAST HIGHLIGHTS ================= */

  const [galleryImages, setGalleryImages] = useState([]);

  const defaultImages = [
    "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1600&auto=format&fit=crop",
  ];

  // ✅ FETCH GALLERY
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${api}/gallery`);

      const galleryOnly = res.data.data.filter(
        (img) => img.category === "gallery"
      );

      setGalleryImages(galleryOnly);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // 👉 Decide which images to show
  const imagesToShow =
    galleryImages.length > 0
      ? galleryImages.map((img) => img.image)
      : defaultImages;

  return (
    <div className="w-full font-sans">

      {/* ================= HERO ================= */}
      <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4 Chelsea">
            Our Events & Campaigns
          </h1>
          <p className="max-w-2xl mx-auto text-white/90">
            Discover the impactful events and community programs we organize.
          </p>
        </motion.div>
      </section>

      {/* ================= UPCOMING ================= */}
      <section className="py-8 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 smooch">
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

                <Link to={`/events/${event.id}`}>
                  <button className="mt-4 w-full bg-[#254151] text-white py-2 rounded-lg hover:bg-orange-500 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PAST HIGHLIGHTS ================= */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 smooch">
          Past Event Highlights
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {imagesToShow.map((img, i) => (
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

    </div>
  );
}
