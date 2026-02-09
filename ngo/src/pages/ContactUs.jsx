import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function ContactUs() {
  return (
    <div className="w-full font-sans bg-gray-50">

      {/* ================= HERO ================= */}
      {/* <section className="relative h-[60vh] flex items-center justify-center text-white text-center">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000&auto=format&fit=crop"
          alt="contact"
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
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-white/90">
            We'd love to hear from you. Reach out for volunteering, partnerships,
            donations, or any queries.
          </p>
        </motion.div>
      </section> */}


      {/* ================= CONTACT SECTION ================= */}
      <section className="py-8 px-6 md:px-20">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* ===== CONTACT INFO ===== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-gray-800">
              Get In Touch
            </h2>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-xl mt-1">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Address</h4>
                <p className="text-gray-600 text-sm">
                  Dhatrutha Being a Giver Foundation,<br />
                  Hyderabad, Telangana, India
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-xl mt-1">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Phone</h4>
                <p className="text-gray-600 text-sm">+91 98765 43210</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-xl mt-1">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Email</h4>
                <p className="text-gray-600 text-sm">
                  support@dhatrutha.org
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-xl mt-1">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Working Hours
                </h4>
                <p className="text-gray-600 text-sm">
                  Mon – Sat : 9:00 AM – 6:00 PM
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-4">
              <h4 className="font-semibold text-gray-800 mb-3">
                Follow Us
              </h4>

              <div className="flex gap-4 text-xl text-[#254151]">
                <FontAwesomeIcon className="cursor-pointer hover:text-orange-500" icon={faFacebook} />
                <FontAwesomeIcon className="cursor-pointer hover:text-orange-500" icon={faInstagram} />
                <FontAwesomeIcon className="cursor-pointer hover:text-orange-500" icon={faTwitter} />
                <FontAwesomeIcon className="cursor-pointer hover:text-orange-500" icon={faLinkedin} />
              </div>
            </div>
          </motion.div>


          {/* ===== CONTACT FORM ===== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send a Message
            </h2>

            <form className="space-y-5">

              {/* Name */}
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm text-gray-600">Subject</label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm text-gray-600">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#254151] text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>


      {/* ================= MAP ================= */}
      <section className="w-full h-[400px]">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.9342690412586!2d78.44668907390415!3d17.318720304782154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbbd05d89d9b9d%3A0x385e70ac6f07a8f7!2sDHA&#39;TRUTH&#39;A%20being%20a%20giver!5e0!3m2!1sen!2sin!4v1770638726694!5m2!1sen!2sin"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </section>
    </div>
  );
}