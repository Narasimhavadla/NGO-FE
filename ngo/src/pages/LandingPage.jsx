import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHeart,
  faUsers,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Together We Can Make a Difference",
    desc: "Empowering communities through education, healthcare, and sustainability initiatives.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Support Education For Every Child",
    desc: "Join us in building schools and providing learning resources worldwide.",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Healthcare Access For All",
    desc: "Medical camps, awareness programs, and life-saving support.",
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function LandingPage() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden font-sans">
      {/* ================= HERO / CAROUSEL ================= */}
      <div className="relative w-full h-[95vh] md:h-[90vh]">
        <AnimatePresence>
          <motion.img
            key={slides[current].id}
            src={slides[current].img}
            alt="slide"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            key={slides[current].title}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-white text-3xl md:text-5xl font-bold max-w-3xl"
          >
            {slides[current].title}
          </motion.h1>

          <p className="text-white/90 mt-4 max-w-xl text-sm md:text-lg">
            {slides[current].desc}
          </p>

          <div className="flex gap-4 mt-6">
            <a href="/donation">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow">
              Donate Now
            </button>
            </a>
            <a href="/volunteer"> 
            <button className="bg-white text-green-700 px-6 py-3 rounded-2xl shadow">
              Volunteer
            </button>
            </a>
          </div>
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"
            className="rounded-2xl shadow-lg"
          />

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We are a <span className="font-semibold">Nonprofit organization </span> dedicated to improving lives
              through education, healthcare, and sustainable community
              development programs. Our mission is to create equal
              opportunities for underprivileged communities.
            </p>
          </div>
        </div>
      </section>

      {/* ================= IMPACT CARDS ================= */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Impact
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: faUsers,
              title: "10K+ Volunteers",
              desc: "People joined hands to support our mission.",
            },
            {
              icon: faHeart,
              title: "25K Lives Impacted",
              desc: "Healthcare & welfare programs delivered.",
            },
            {
              icon: faGlobe,
              title: "15 Countries",
              desc: "Global outreach and sustainability drives.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 shadow text-center"
            >
              <div className="text-green-600 flex justify-center mb-4 text-4xl">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <h3 className="font-semibold text-xl mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-green-600 py-16 text-center text-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Be The Change You Wish To See
        </h2>
        <p className="mb-6 text-white/90">
          Your small contribution can make a big difference.
        </p>
        <Link to="/volunteer">
            <button className="bg-white text-green-700 px-8 py-3 rounded-2xl shadow font-semibold">
            Get Involved
            </button>
        </Link>
      </section>
    </div>
  );
}