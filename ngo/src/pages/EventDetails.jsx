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
import { useEffect, useState } from "react";
import axios from "axios";
import ProgramHighlights from "../components/ProgramHighlights";

export default function EventDetails() {
  const { id } = useParams();

  const api = import.meta.env.VITE_API_BASE_URL;

  // ===== EVENTS DATA =====
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
        "Our Free Health Checkup Camp is dedicated to providing healthcare services to underserved communities. Professional doctors and volunteers conducted checkups, screenings, and distributed medicines.",
      impact:
        "250+ beneficiaries received consultations, medicines, and preventive healthcare awareness.",

      gallery: [
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
        "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b",
        "https://images.unsplash.com/photo-1530026405186-ed1f139313f8",
        "https://images.unsplash.com/photo-1584515933487-779824d29309",
        "https://images.unsplash.com/photo-1576765607924-bf3d1c3c9b45",
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
      ],
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
        "This program promotes the importance of education among rural children through workshops, mentorship, and book distribution.",
      impact:
        "180+ students benefited through educational kits and career guidance.",

      gallery: [
        "https://images.unsplash.com/photo-1509062522246-3755977927d7",
        "https://images.unsplash.com/photo-1588072432836-e10032774350",
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
        "https://images.unsplash.com/photo-1600195077075-7c815f540a3d",
        "https://images.unsplash.com/photo-1513258496099-48168024aec0",
      ],
    },
     {
      id: "3",
      title: "Education Awareness Drive",
      date: "April 05, 2026",
      location: "Hyderabad",
      participants: "1500+ Beneficiaries",
      image:
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1600&auto=format&fit=crop",
      description:
        "This program promotes the importance of education among rural children through workshops, mentorship, and book distribution.",
      impact:
        "180+ students benefited through educational kits and career guidance.",

      gallery: [
        "https://images.unsplash.com/photo-1509062522246-3755977927d7",
        "https://images.unsplash.com/photo-1588072432836-e10032774350",
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
        "https://images.unsplash.com/photo-1600195077075-7c815f540a3d",
        "https://images.unsplash.com/photo-1513258496099-48168024aec0",
      ],
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

          <button className="mt-5 bg-[#F4CE50] text-[#254151] px-6 py-2 rounded-xl font-semibold hover:bg-orange-400 hover:text-white transition flex items-center gap-2 mx-auto">
            <FontAwesomeIcon icon={faHandHoldingHeart} />
            Donate Now
          </button>
        </motion.div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="py-12 px-6 md:px-20 max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* ABOUT */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3 text-[#254151]">
              About This Event
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* IMPACT */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3 text-[#254151]">
              Event Impact
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {event.impact}
            </p>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="bg-white p-4 rounded-2xl shadow space-y-5 h-fit">
          <h3 className="text-xl font-bold text-[#254151]">
            Event Information
          </h3>

          <div className="flex items-center gap-3 text-gray-700">
            <FontAwesomeIcon icon={faCalendarDays} />
            {event.date}
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FontAwesomeIcon icon={faLocationDot} />
            {event.location}
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FontAwesomeIcon icon={faUsers} />
            {event.participants}
          </div>

          <button className="w-full bg-[#F4CE50] text-[#254151] py-2 rounded-xl font-semibold hover:bg-orange-400 hover:text-white transition flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faHandHoldingHeart} />
            Donate Now
          </button>

          <Link to="/events">
            <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Events
            </button>
          </Link>
        </div>
      </section>

      <ProgramHighlights fallbackImages={event.gallery} />
    </div>
  );
}
