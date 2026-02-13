import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faPhone,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const api = import.meta.env.VITE_API_BASE_URL ;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const res = await axios.post(
      `${api}/register`,
      {
        username: formData.name,
        phone: formData.phone,
        password: formData.password,
        role: "user", // ✅ default role
      }
    );

    setSuccess("Registration successful 🎉");

    // Redirect to login after 1.5 sec
    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (err) {
    setError(
      err.response?.data?.message ||
        "Registration failed"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-[80vh] flex  items-center justify-center drop-shadow-lg p-4">
      <div className="grid lg:grid-cols-2 w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">


        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-6 flex flex-col justify-center"
        >
          <div className="max-w-md w-full mx-auto">

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 mb-8">
              Fill the details to register
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* NAME */}
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Username
                </label>
                <div className="mt-2 flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 ring-[#254151]">
                  <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter Username"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* EMAIL */}
              {/* <div>
                <label className="text-sm font-semibold text-gray-600">
                  Email Address
                </label>
                <div className="mt-2 flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 ring-[#254151]">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div> */}

              {/* PHONE */}
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Phone Number
                </label>
                <div className="mt-2 flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 ring-[#254151]">
                  <FontAwesomeIcon icon={faPhone} className="text-gray-400 mr-2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Password
                </label>
                <div className="mt-2 flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 ring-[#254151]">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create password"
                    className="w-full outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              {/* <div>
                <label className="text-sm font-semibold text-gray-600">
                  Confirm Password
                </label>
                <div className="mt-2 flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 ring-[#254151]">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm password"
                    className="w-full outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="text-gray-400"
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
              </div> */}

              {/* REGISTER BUTTON */}
              <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#254151] text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-[#1f3441] transition"
                >
                  {loading ? "Registering..." : "Register"}
                </motion.button>

            </form>

            {/* FOOTER */}
            <p className="text-sm text-gray-500 text-center mt-4">
              Already have an account?
              <a
                href="/login"
                className="text-[#254151] font-semibold hover:underline ml-1"
              >
                Login
              </a>
            </p>
          </div>
        </motion.div>
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-center items-center text-white bg-[#254151] p-6 relative"
        >
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 text-center space-y-6">
            <div className="flex justify-center">
              <FontAwesomeIcon icon={faHandHoldingHeart} size="3x" />
            </div>

            <h1 className="text-4xl font-bold">Join Our Mission</h1>

            <p className="text-lg opacity-90 max-w-md">
              Become a part of our NGO family. Register to support causes,
              participate in events, and help transform lives.
            </p>

            <div className="border-t border-white/30 pt-6 text-sm opacity-80">
              Together we serve • Together we grow • Together we care
            </div>
          </div>
        </motion.div>
        
      </div>


    </div>
  );
}
