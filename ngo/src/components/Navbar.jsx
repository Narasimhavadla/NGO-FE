import { useState } from "react";
import logo from "../assets/dhatruthaLogo.webp";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* ===== ACTIVE LINK STYLE ===== */
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 transition ${
      isActive ? "text-orange-400" : "hover:text-orange-400"
    }`;

  /* ===== AUTO CLOSE ===== */
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  /* ===== ANIMATION VARIANTS ===== */
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.4 },
    },
  };

  return (
    <nav className="w-[100%] bg-[#254151] text-white shadow-md sticky top-0 z-100">
      
      {/* ================= TOP BAR ================= */}
      <div className="h-20 flex items-center justify-between px-6 lg:px-12 max-w-7xl mx-auto">
        
        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            className="w-32 h-16 lg:w-42 lg:h-16"
          />
        </NavLink>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden lg:flex gap-8 text-lg font-semibold items-center">
          
          <NavLink to="/" end className={navLinkClass}>
            Programs
          </NavLink>

          <NavLink to="/events" className={navLinkClass}>
            Events
          </NavLink>

          <NavLink to="/our-team" className={navLinkClass}>
            Meet Our Team
          </NavLink>

          <NavLink to="/about-us" className={navLinkClass}>
            About Us
          </NavLink>

          <NavLink to="/contact-us" className={navLinkClass}>
            Contact Us
          </NavLink>
           {/* <NavLink to="/volunteer" className={navLinkClass}>
            Volunteer
          </NavLink> */}
          <NavLink to="/auth" className={navLinkClass}>
            Login
          </NavLink>
        </div>

        {/* ================= DONATE ================= */}
        <div className="hidden lg:flex">
          <NavLink to="/donation">
            <button className="px-6 py-2 text-lg font-semibold bg-[#F4CE50] text-[#254151] hover:bg-orange-400 hover:text-white transition flex items-center gap-2 rounded-md">
              <FontAwesomeIcon icon={faHandHoldingHeart} />
              Donate
            </button>
          </NavLink>
        </div>

        {/* ================= HAMBURGER ================= */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lg:hidden bg-[#1f3644] px-6 py-6 space-y-5 text-lg font-semibold overflow-hidden"
          >
            
            <NavLink
              to="/"
              end
              className={navLinkClass}
              onClick={handleLinkClick}
            >
              Programs
            </NavLink>

            <NavLink
              to="/events"
              className={navLinkClass}
              onClick={handleLinkClick}
            >
              Events
            </NavLink>

            <NavLink
              to="/our-team"
              className={navLinkClass}
              onClick={handleLinkClick}
            >
              Meet Our Team
            </NavLink>

            <NavLink
              to="/about-us"
              className={navLinkClass}
              onClick={handleLinkClick}
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact-us"
              className={navLinkClass}
              onClick={handleLinkClick}
            >
              Contact Us
            </NavLink>

             {/* <NavLink
              to="/volunteer"
              className={navLinkClass}
              onClick={handleLinkClick}
            >
              Volunteer
            </NavLink> */}

             <NavLink
              to="/auth"
              className={navLinkClass}
              onClick={handleLinkClick}
            >
              Login
            </NavLink>

            {/* DONATE */}
            <NavLink to="/donation" onClick={handleLinkClick}>
              <button className="w-full py-3 bg-[#F4CE50] text-[#254151] font-semibold rounded-md hover:bg-orange-400 hover:text-white transition flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faHandHoldingHeart} />
                Donate
              </button>
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
