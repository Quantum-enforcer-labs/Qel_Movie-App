import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";
import { Film, Search, Sun, Moon, Star } from "lucide-react";
import Footer from "../components/Footer";

const RootComponent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate({ to: "/search", search: { query: searchQuery } });
    setSearchQuery(""); // optional: clear input after navigate
  };

  const navLinks = [
    { path: "/", name: "Home", icon: null },
    { path: "/movies", name: "Movies", icon: Film },
    { path: "/tvshows", name: "TV Shows", icon: null },
    { path: "/favourites", name: "Favorites", icon: Star },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900 text-gray-100"
            : "bg-white text-gray-900 shadow-md"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold"
              activeProps={{
                className: "font-bold",
              }}
            >
              <Film className="h-7 w-7 text-red-500" />
              <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                Qel Movies
              </span>
            </Link>

            {/* Navigation links */}
            <div className="flex items-center gap-8">
              <div className="flex gap-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`group relative flex items-center gap-1 py-1 px-2 transition-colors ${
                        darkMode ? "hover:text-red-400" : "hover:text-red-600"
                      }`}
                      activeProps={{
                        className: `font-semibold ${
                          darkMode ? "text-red-400" : "text-red-600"
                        }`,
                      }}
                      inactiveProps={{
                        className: darkMode ? "text-gray-300" : "text-gray-700",
                      }}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      {link.name}
                      <span
                        className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                          darkMode ? "bg-red-400" : "bg-red-600"
                        } transition-all duration-300 group-hover:w-full`}
                        aria-hidden="true"
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Search bar */}
              <form className="relative w-64" onSubmit={handleSearch}>
                <Search
                  className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 transition-all ${
                    darkMode
                      ? "bg-gray-800 focus:ring-red-500 text-white placeholder-gray-400"
                      : "bg-gray-100 focus:ring-red-400 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </form>

              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full focus:outline-none transition-colors ${
                  darkMode
                    ? "text-yellow-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="pt-20">
        {" "}
        {/* Add padding to account for fixed navbar */}
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <Footer />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
