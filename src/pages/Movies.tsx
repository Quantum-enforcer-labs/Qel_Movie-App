import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchMovieGenres } from "../utils/fetching";
import { Heart, HeartOff, Star } from "lucide-react";
import type { Movie, Genre } from "../types/types";
import { useFavoritesStore } from "../store/store";

export default function Movies() {
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const { data: genres } = useQuery({
    queryKey: ["movieGenres"],
    queryFn: fetchMovieGenres,
  });

  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movies", page, selectedGenre],
    queryFn: () => fetchMovies(page, selectedGenre || undefined),
  });

  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const toggleFavorite = (e: React.MouseEvent, movie: Movie) => {
    e.preventDefault();
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  if (isLoading) return <div className="p-4 text-white">Loading...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Qel Movies</h1>

      {/* Genre Filter */}
      <div className="mb-6 flex justify-center">
        <select
          className="px-4 py-2 bg-gray-700 rounded text-white"
          value={selectedGenre ?? ""}
          onChange={(e) => setSelectedGenre(Number(e.target.value) || null)}
        >
          <option value="">All Genres</option>
          {genres?.map((genre: Genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.results.map((movie: Movie) => {
          const fav = isFavorite(movie.id);
          return (
            <div
              key={movie.id}
              className="relative bg-gray-800 rounded p-4 shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded"
              />
              <h2 className="text-lg mt-2 font-bold">{movie.title}</h2>
              <p className="text-gray-400 text-sm line-clamp-2">
                {movie.overview}
              </p>
              <div className="flex items-center text-yellow-400 mt-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-500 mr-1" />
                {movie.vote_average.toFixed(1)}
              </div>
              <button
                onClick={(e) => toggleFavorite(e, movie)}
                className="absolute top-2 right-2 bg-black bg-opacity-60 p-2 rounded-full text-white hover:text-red-500"
              >
                {fav ? <Heart className="fill-red-500" /> : <HeartOff />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-300 self-center">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
