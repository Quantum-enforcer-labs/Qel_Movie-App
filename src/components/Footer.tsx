import { Facebook, Instagram, Twitter, Github } from "lucide-react";
import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-4">🎬 Qel Movies</h2>
          <p className="text-gray-400 text-sm">
            Discover your next favorite movie. Fast, curated, and just one click
            away.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies" className="hover:text-white">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/tvshows" className="hover:text-white">
                TV Shows
              </Link>
            </li>
            <li>
              <Link to="/favourites" className="hover:text-white">
                Favorites
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                TMDb API
              </a>
            </li>
          </ul>
        </div>

        {/* Partners */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Partners</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Trevor Nhepa
              </a>
            </li>
            <li>
              <a
                href="https://developer.mozilla.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                MDN Web Docs
              </a>
            </li>
            <li>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Vercel Hosting
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Quantum Enforcer Labs
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/prosper.chitewe.2025"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <Facebook />
            </a>
            <a
              href="https://www.instagram.com/_q_e_l/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <Instagram />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Twitter />
            </a>
            <a
              href="https://github.com/Quantum-enforcer-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Github />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Qel Movies. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
