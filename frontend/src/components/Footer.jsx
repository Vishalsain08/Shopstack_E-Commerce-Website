import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white rounded-t-3xl shadow-xl mt-8">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">

        {/* Brand & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-sky-300 mb-2">ShopStack 🛍️</h2>
          <p className="text-sm text-slate-300">
            Explore top-quality products with a smooth shopping experience.
          </p>
        </div>

        {/* 📞 Contact Details */}
        <div>
          <h3 className="text-lg font-semibold text-peach-100 mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-sky-300" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-sky-300" /> support@shopstack.com
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-sky-300" /> Jaipur, Rajasthan, India
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold text-peach-100 mb-3">Follow Us</h3>
          <p className="text-sm text-slate-300 mb-3">Stay connected with us on social platforms:</p>
          <div className="flex gap-4 text-sky-300 text-xl">
            <a href="#"><FaFacebookF className="hover:text-white transition" /></a>
            <a href="#"><FaTwitter className="hover:text-white transition" /></a>
            <a href="#"><FaInstagram className="hover:text-white transition" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-600 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} ShopStack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
