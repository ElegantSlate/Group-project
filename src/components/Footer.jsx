import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-16">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>
            <h2 className="text-3xl font-bold text-orange-500 mb-4">
              Empire
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Discover, book and experience the best events
              happening around you. Empire is a platform
              that helps people discover and book tickets
              for exciting events.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              About Us
            </h3>

            <p className="text-gray-400 leading-relaxed">
              We connect people to unforgettable experiences
              by making event discovery and ticket booking
              simple, convenient and accessible.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <span className="text-orange-500 font-medium">Email:</span>
                <br />
                info@empire.com
              </li>

              <li>
                <span className="text-orange-500 font-medium">Phone:</span>
                <br />
                +254712345678
              </li>

              <li>
                <span className="text-orange-500 font-medium">Location:</span>
                <br />
                Nairobi, Kenya
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Follow Us
            </h3>

            <p className="text-gray-400 mb-5">
              Stay connected with us and never miss an event.
            </p>

            <div className="flex items-center gap-4">

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram"
                className="text-gray-400 hover:text-orange-500 transition duration-300"
              >
                <FaInstagram size={28} />
              </a>

    
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="Facebook"
                className="text-gray-400 hover:text-orange-500 transition duration-300"
              >
                <FaFacebookF size={28} />
              </a>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="X"
                className="text-gray-400 hover:text-orange-500 transition duration-300"
              >
                <FaXTwitter size={28} />
              </a>

            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Empire. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
