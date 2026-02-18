
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import krishna from "../assets/c.krishna.webp"
import karthik from "../assets/ADIKE_KARTHIK.png"
import sravan from "../assets/sravan.webp"

export default function OurTeam() {
  const api = import.meta.env.VITE_API_BASE_URL;

  const [ourTeam, setOurTeam] = useState([]);

  /* ================= FETCH TEAM ================= */
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${api}/team`);
        setOurTeam(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTeam();
  }, []);

  /* ================= SPLIT TEAMS ================= */

  // Leadership → designation contains "founder"
  const leadershipTeam = ourTeam.filter((member) =>
    member.designation?.toLowerCase().includes("founder")
  );

  // Core → remaining members
  const coreTeam = ourTeam.filter(
    (member) =>
      !member.designation?.toLowerCase().includes("founder")
  );

  return (
    <div className="w-full font-sans">
      {/* ================= HERO ================= */}
      <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop"
          alt="team"
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
            Meet Our Team
          </h1>

          <p className="max-w-2xl mx-auto text-white/90 text-left">
            The Dhatrutha Impact Team: A passionate collective working
            across health, education, and environmental initiatives. We
            empower the underprivileged through strategic giving,
            resource allocation, and impactful community service
            projects.
          </p>
        </motion.div>
      </section>

      {/* ================= LEADERSHIP ================= */}
      <section className="py-8 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 smooch">
          <span className="bg-orange-400 px-2 text-[#254151]">
            Leadership
          </span>{" "}
          Team
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          
          <div className="bg-white rounded-2xl shadow hover:shadow-xl transition text-center p-8">
            <img
                src={karthik}
                alt={karthik}
                className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
              />
                <h3 className="text-xl font-semibold text-gray-800">
                  A.Karthik
                </h3>
              <p className="text-orange-500 text-sm mb-4">
                Founder
              </p>
              <div className="flex justify-center gap-4 text-[#254151] text-lg">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="cursor-pointer hover:text-orange-500"
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="cursor-pointer hover:text-orange-500"
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="cursor-pointer hover:text-orange-500"
                />
              </div>

          </div>
          <div className="bg-white rounded-2xl shadow hover:shadow-xl transition text-center p-8">
            <img
                src={krishna}
                alt={krishna}
                className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
              />
                <h3 className="text-xl font-semibold text-gray-800">
                C.Krishna
              </h3>
              <p className="text-orange-500 text-sm mb-4">
                Founder
              </p>
              <div className="flex justify-center gap-4 text-[#254151] text-lg">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="cursor-pointer hover:text-orange-500"
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="cursor-pointer hover:text-orange-500"
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="cursor-pointer hover:text-orange-500"
                />
              </div>

          </div>
          <div className="bg-white rounded-2xl shadow hover:shadow-xl transition text-center p-8">
            <img
                src={sravan}
                className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
              />
                <h3 className="text-xl font-semibold text-gray-800">
                  Sravan
                </h3>
              <p className="text-orange-500 text-sm mb-4">
                Founder
              </p>
              <div className="flex justify-center gap-4 text-[#254151] text-lg">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="cursor-pointer hover:text-orange-500"
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="cursor-pointer hover:text-orange-500"
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="cursor-pointer hover:text-orange-500"
                />
              </div>

          </div>
          {leadershipTeam.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition text-center p-8"
            >
              <img
                src={
                  member.image
                }
                alt={member.name}
                className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
              />

              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>

              {/* Forced Founder Label */}
              <p className="text-orange-500 text-sm mb-4">
                Founder
              </p>

              <div className="flex justify-center gap-4 text-[#254151] text-lg">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="cursor-pointer hover:text-orange-500"
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="cursor-pointer hover:text-orange-500"
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="cursor-pointer hover:text-orange-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CORE TEAM ================= */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 smooch">
          <span className="bg-orange-400 px-2 text-[#254151]">
            Core
          </span>{" "}
          Team
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {coreTeam.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition text-center p-6"
            >
              <img
                src={
                  member.image
                    
                }
                alt={member.name}
                className="w-36 h-36 mx-auto rounded-full object-cover mb-3"
              />

              <h3 className="font-semibold text-gray-800">
                {member.name}
              </h3>

              <p className="text-gray-500 text-sm mb-3">
                {member.designation || "Core Team"}
              </p>
              <div className="flex justify-center gap-4 text-[#254151] text-lg">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="cursor-pointer hover:text-orange-500"
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="cursor-pointer hover:text-orange-500"
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="cursor-pointer hover:text-orange-500"
                />
              </div>
            </motion.div>
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
          className="text-3xl md:text-4xl font-bold mb-4 Chelsea"
        >
          Join Our Mission
        </motion.h2>

        <p className="max-w-2xl mx-auto text-white/90 mb-6">
          Become a volunteer or partner with us to create lasting
          impact in society.
        </p>

        <button className="bg-[#F4CE50] text-[#254151] px-8 py-3 rounded-xl font-semibold hover:bg-orange-400 hover:text-white transition">
          Get Involved
        </button>
      </section>
    </div>
  );
}

