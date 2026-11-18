import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 w-full h-20 z-[1000] bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/croud.jpg')] bg-cover bg-center bg-no-repeat shadow-md">
      <div className="max-w-7xl h-full mx-auto px-6 flex items-center justify-between">
        
        {/* Website Logo / Name - Sized cleanly */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 text-xl font-bold text-white no-underline" 
          onClick={closeMenu}
        >
          <img 
            src="/M.jpg" 
            alt="Empire Event" 
            className="h-10 w-10 rounded-full object-cover border border-white/70" 
          />
          <span className="tracking-wide">EMPIRE</span>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          className="hidden max-md:flex items-center justify-center w-9 h-9 bg-black/40 rounded text-xl text-[#47cc0a] cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links & Auth Buttons */}
        <nav
          className={`flex items-center gap-6 max-md:absolute max-md:top-20 max-md:left-[-100%] max-md:w-full max-md:h-[calc(100vh-5rem)] max-md:bg-[rgba(15,23,42,0.98)] max-md:backdrop-blur-md max-md:flex-col max-md:justify-center max-md:gap-6 max-md:transition-all max-md:duration-300 ${
            menuOpen ? "max-md:left-0" : ""
          }`}
        >
          <ul className="list-none flex items-center gap-6 m-0 p-0 max-md:flex-col max-md:items-center">
            <li>
              <NavLink
                to="/"
                end
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-sm text-slate-200 no-underline font-medium hover:text-white transition-colors ${
                    isActive ? "text-white underline underline-offset-4 font-semibold" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-sm text-slate-200 no-underline font-medium hover:text-white transition-colors ${
                    isActive ? "text-white underline underline-offset-4 font-semibold" : ""
                  }`
                }
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-sm text-slate-200 no-underline font-medium hover:text-white transition-colors ${
                    isActive ? "text-white underline underline-offset-4 font-semibold" : ""
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-sm text-slate-200 no-underline font-medium hover:text-white transition-colors ${
                    isActive ? "text-white underline underline-offset-4 font-semibold" : ""
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="flex items-center gap-3 max-md:flex-col max-md:w-2/3 max-md:text-center">
            <Link
              to="/login"
              className="px-4 py-2 rounded text-xs font-medium text-[#2ef720] border border-white/40 hover:bg-white/10 transition-all"
              onClick={closeMenu}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded text-xs font-medium bg-[#e83131] text-white hover:bg-[#d02828] transition-all"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;