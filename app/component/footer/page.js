import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Repair Wala</h2>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted shop for iPhone & Android services, accessories, and mobile repairs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-500 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-purple-500 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-purple-500 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-purple-500 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-purple-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Shop</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Services</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Customer Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-purple-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Warranty Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Shipping Info</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-purple-400" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-purple-400" />
                <span>support@mobilecare.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-purple-400" />
                <span>123, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Repair Wala. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
