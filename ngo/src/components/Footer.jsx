import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-12 pb-6 px-6">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        
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
          <div className="space-y-2 text-sm ">
            
              <a href="/" className="hover:text-orange-500 transition">
                Our Programs
              </a>
              <br></br>
            
            
              <a href="/about-us" className="hover:text-orange-500 transition">
                About Us
              </a>
              <br></br>
            
              <a href="/our-team" className="hover:text-orange-500 transition">
                Meet our Team
              </a>
              <br></br>
            
              <a href="/contact-us" className="hover:text-orange-500 transition">
                Contact
              </a>
              <br></br>
            
              <a href="/donation" className="hover:text-orange-500 transition">
                Donate
              </a>
              <br></br>
            
            
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: dhatrutha@gmail.com</li>
            <li>Phone: +91 9392784225</li>
            <li>Address: Rajendra Nagar,Ranga Reddy, Hyderabad, India</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Newsletter
          </h3>
          <p className="text-sm mb-3">
            Subscribe for updates on our activities.
          </p>
          <div className="flex gap-5">
            <a href="https://www.youtube.com/@dhatruthabeingagiver" target="blank"><FontAwesomeIcon icon={faYoutube} className="text-red-500"/></a>
            <a href="/" target="blank"><FontAwesomeIcon icon={faInstagram} className="text-purple-500"/></a>
            <a href="/" target="blank"><FontAwesomeIcon icon={faFacebook} className="text-blue-500"/></a>
          </div>

          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 mt-10 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} DHATRUTHA NGO. All Rights Reserved.
      </div>
    </footer>
  );
}
