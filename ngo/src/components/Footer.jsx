export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-12 pb-6 px-6">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        
        {/* NGO Info */}
        <div>
          <h2 className="text-2xl font-bold text-[#F4CE50] mb-3 Chelsea">
            Dha'truth'a
          </h2>
          <p className="opacity-60">Being a Giver</p>
          <p className="text-sm leading-6">
            We are dedicated to improving lives through education, healthcare,
            and social empowerment. Together, we can build a better future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-orange-500 transition">
                Our Programs
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:text-orange-500 transition">
                About Us
              </a>
            </li>
            
            <li>
              <a href="/our-team" className="hover:text-orange-500 transition">
                Meet our Team
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-orange-500 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Donate
              </a>
            </li>
            
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@hopehands.org</li>
            <li>Phone: +91 XXXXXXXXXX</li>
            <li>Address: Hyderabad, India</li>
          </ul>
        </div>

        {/* Newsletter */}
        {/* <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Newsletter
          </h3>
          <p className="text-sm mb-3">
            Subscribe for updates on our activities.
          </p>

          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="px-3 py-2 rounded-md text-black w-full outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white text-sm transition"
            >
              Subscribe
            </button>
          </form>
        </div> */}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 mt-10 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} HopeHands NGO. All Rights Reserved.
      </div>
    </footer>
  );
}
