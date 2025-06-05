import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 flex flex-col items-center justify-center text-center">
      <motion.h1
        className="text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🎬 Welcome to Qel Movies
      </motion.h1>

      <motion.p
        className="text-xl max-w-2xl text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Dive into a universe of cinematic experiences! MovieVerse is your
        ultimate destination for discovering top-rated films, exploring detailed
        movie information, and enjoying beautifully designed movie collections.
        Whether you're a casual viewer or a film aficionado, you'll find
        something to love here.
      </motion.p>
    </div>
  );
}
