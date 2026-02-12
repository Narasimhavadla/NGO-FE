import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";

export default function NGOLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#254151] via-[#1f3441] to-[#0f2027] p-4">
      <div className="grid lg:grid-cols-2 w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-center items-center text-white bg-[#254151] p-8 relative"
        >
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 text-center space-y-6">
            <div className="flex justify-center">
              <FontAwesomeIcon icon={faHandHoldingHeart} size="3x" />
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Welcome Back
            </h1>

            <p className="text-lg opacity-90 max-w-md">
              Together we make a difference. Login to manage donations,
              events, and continue supporting our mission.
            </p>

            <div className="border-t border-white/30 pt-6 text-sm opacity-80">
              Empowering communities • Spreading hope • Changing lives
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-8 flex flex-col justify-center"
        >
          <div className="max-w-md w-full mx-auto">

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Dhatrutha Login
            </h2>
            <p className="text-gray-500 mb-8">
              Please enter your credentials to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* EMAIL */}
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Email Address
                </label>
                <div className="mt-2 flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 ring-[#254151]">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-400 mr-2"
                  />
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
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Password
                </label>
                <div className="mt-2 flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 ring-[#254151]">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-gray-400 mr-2"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400"
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
              </div>

              {/* OPTIONS */}
              <div className="flex items-center justify-between text-sm">
                {/* <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="accent-[#254151]"
                  />
                  Remember me
                </label> */}

                {/* <a
                  href="#"
                  className="text-[#254151] font-semibold hover:underline"
                >
                  Forgot Password?
                </a> */}
              </div>

              {/* LOGIN BUTTON */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-[#254151] text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-[#1f3441] transition"
              >
                Login
              </motion.button>
            </form>

            {/* FOOTER */}
            <p className="text-sm text-gray-500 text-center mt-8">
              Don’t have an account?
              <a
                href="/register"
                className="text-[#254151] font-semibold hover:underline ml-1"
              >
                Register
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}