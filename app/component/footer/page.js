import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { MdWhatsapp } from "react-icons/md";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Repair Wala</h2>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted shop for iPhone & Android services, accessories, and
              mobile repairs.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/RepairWala"
                className="hover:text-purple-500 transition"
              >
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-purple-500 transition">
                <Instagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@ripairwalaofficial"
                className="hover:text-purple-500 transition"
              >
                <FaTiktok />
              </a>
              <a href="#" className="hover:text-purple-500 transition">
                <Youtube size={20} />
              </a>
              <a
                href="https://wa.me/8801791421041"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-500 transition"
              >
                <MdWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Home
                </a>
              </li>
              <li>
                <Link
                  href={"/component/products/all_products"}
                  className="hover:text-purple-400 transition"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href={"/component/services/iphone"}
                  className="hover:text-purple-400 transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href={"/component/about"}
                  className="hover:text-purple-400 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={"/component/contact_us"}
                  className="hover:text-purple-400 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Customer Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={"/component/faq"}
                  className="hover:text-purple-400 transition"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href={"/component/refund"}
                  className="hover:text-purple-400 transition"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href={"/component/warranty"}
                  className="hover:text-purple-400 transition"
                >
                  Warranty Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <a
                  href="tel:+8801791421041"
                  className="flex items-center gap-2 hover:text-purple-500 transition"
                >
                  <Phone size={18} className="text-purple-400" />
                  <span>+880 1791-421041</span>
                </a>
              </li>

              <li className="flex items-center gap-2">
                <a
                  href="mailto:support@mobilecare.com"
                  className="flex items-center gap-2 hover:text-purple-500 transition"
                >
                  <Mail size={18} className="text-purple-400" />
                  <span>support@mobilecare.com</span>
                </a>
              </li>

              <li className="flex items-center gap-2">
                <a
                  href="https://www.google.com/maps?q=Shah+Ali+plaza,+Mirpur-10,+Dhaka,+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-purple-500 transition"
                >
                  <MapPin size={18} className="text-purple-400" />
                  <span>Shah Ali plaza, Mirpur-10, Dhaka, Bangladesh</span>
                </a>
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
