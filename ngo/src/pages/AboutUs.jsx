import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHelping,
  faBullseye,
  faEye,
  faHeart,
  faUsers,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="w-full font-sans">
      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2000&auto=format&fit=crop"
          alt="ngo"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 px-6"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 smooch">
            About  Dha<span className="text-orange-400">Truth</span>a
          </h1>

          <p className="max-w-2xl mx-auto text-white/90">
            We are committed to transforming lives through education,
            healthcare, and sustainable community development programs.
          </p>
        </motion.div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1200&auto=format&fit=crop"
            alt="story"
            className="rounded-2xl shadow-lg"
          />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Dha<span className="bg-orange-400 ">truth</span>a
            </h2>
            <span className="bg-[#F4CE50] text-sm px-2 font-semibold">Our Inspiration - Swami Vivekananda, Subhash Chandra Bose, Chandra Shekar Azad</span>

            <p className="text-gray-700 mb-4 leading-relaxed">
              <span className="font-semibold">"Dha'truth'a</span> Being a <span className="font-semibold">Giver</span>" is a non-governmental organization (NGO) based in Hyderabad, India, that operates independently of any government and focuses on non-profit or humanitarian goals. The organization is dedicated to promoting the act of giving and providing resources and support to those in need, as well as aiming to provide support and assistance through various charitable activities and community service initiatives.
               Dhatrutha Being a Giver works on various issues such as human rights, health, education, environment, and social justice, with a mission to uplift the poor and make a positive impact on society.
                With a history of 7 years, the NGO has grown from 4 members to over 1000 selfless volunteers.
            </p>

            {/* <p className="text-gray-600 leading-relaxed">
              Through collaborative partnerships and passionate
              volunteers, we continue to create sustainable impact and
              inspire hope in thousands of lives every year.
            </p> */}
          </motion.div>
        </div>
      </section>

      {/* ================= MISSION VISION VALUES ================= */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Core Foundations
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              icon: faBullseye,
              title: "Our Mission",
              desc: "At Dhatrutha Being a Giver, our mission is to make the world a better place by focusing on awareness/issues such as Bharatiya Culture & Traditions, human rights, health, education, environment, and social justice. We believe in creating a society where everyone has access to basic needs and opportunities to lead a dignified life. Join us in our efforts to bring about a positive change.",
            },
            {
              icon: faEye,
              title: "Our Vision",
              desc: "At Dhatrutha Being a Giver, our vision is to build a compassionate and empowered society rooted in Bharatiya culture and universal human values. We envision a world where every individual lives with dignity, equality, and access to quality education, healthcare, and sustainable livelihoods. Through collective responsibility and conscious action, we strive to nurture communities that are self-reliant, socially just, environmentally responsible, and culturally enriched for generations to come.",
            },
            // {
            //   icon: faHeart,
            //   title: "Our Values",
            //   desc: `At Dhatrutha Being a Giver, our work is guided by strong values that define who we are and how we serve:
            //   Compassion & Humanity`,
            // },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow text-center hover:shadow-xl transition "
            >
              <div className="text-3xl text-[#254151] mb-4">
                <FontAwesomeIcon icon={item.icon} />
              </div>

              <h3 className="font-semibold text-xl mb-3 ">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed text-center">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

            {/* ================= CORE VALUES ================= */}


      <section className="py-16 px-6 md:px-20 bg-white">
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800 relative"
  >
    Core Values

    
  </motion.h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {[
      {
        title: "Compassion",
        desc: "We serve with empathy and understanding, recognizing the inherent worth of every individual.",
        icon: faHeart,
      },
      {
        title: "Integrity",
        desc: "We uphold the highest ethical standards in our work, ensuring transparency and accountability.",
        icon: faBullseye,
      },
      {
        title: "Inclusivity",
        desc: "We embrace diversity and strive to create opportunities for all, especially marginalized groups.",
        icon: faUsers,
      },
      {
        title: "Collaboration",
        desc: "We believe in working together with communities, stakeholders, and partners to achieve lasting change.",
        icon: faHandsHelping,
      },
    ].map((value, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.15 }}
        viewport={{ once: true }}
        className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition text-center"
      >
        {/* Icon */}
        <div className="text-3xl text-orange-400 mb-4">
          <FontAwesomeIcon icon={value.icon} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          {value.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {value.desc}
        </p>
      </motion.div>
    ))}
  </div>
</section>

      {/* ================= IMPACT ================= */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Impact
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: faUsers, number: "10,000+", label: "Lives Impacted" },
            { icon: faHandsHelping, number: "500+", label: "Volunteers" },
            { icon: faGlobe, number: "120+", label: "Communities Served" },
            { icon: faHeart, number: "50+", label: "Projects Completed" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl shadow bg-gray-50"
            >
              <div className="text-3xl text-orange-500 mb-3">
                <FontAwesomeIcon icon={item.icon} />
              </div>

              <h3 className="text-2xl font-bold text-gray-800">
                {item.number}
              </h3>

              <p className="text-gray-600 text-sm">
                {item.label}
              </p>
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
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Be Part of the Change
        </motion.h2>

        <p className="max-w-2xl mx-auto text-white/90 mb-6">
          Join us in creating meaningful impact and transforming lives
          through collective action.
        </p>

          <NavLink to="/volunteer">
        <button className="bg-[#F4CE50] text-[#254151] px-8 py-3 rounded-xl font-semibold hover:bg-orange-400 hover:text-white transition">
          Become a Volunteer
        </button>
        </NavLink>
      </section>
    </div>
  );
}
