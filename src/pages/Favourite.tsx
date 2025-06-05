import { useFavoritesStore } from "../store/store";
import { Link } from "@tanstack/react-router";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <Link
              to="/movie/$movieId"
              params={{ movieId: String(movie.id) }}
              key={movie.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded shadow"
              />
              <p className="mt-2 text-sm text-center">{movie.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
