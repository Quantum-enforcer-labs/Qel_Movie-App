import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTvShows, fetchTvGenres } from "../utils/fetching";
import type { TvShow, Genre } from "../types/types";
import { useFavoritesStore } from "../store/store";
import { Heart, HeartOff, Star } from "lucide-react";

export default function TvShows() {
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const { data: genres } = useQuery({
    queryKey: ["tvGenres"],
    queryFn: fetchTvGenres,
  });

  const {
    data: tvShows,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tvShows", page, selectedGenre],
    queryFn: () => fetchTvShows(page, selectedGenre || undefined),
  });

  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const toggleFavorite = (e: React.MouseEvent, show: TvShow) => {
    e.preventDefault();
    if (isFavorite(show.id)) {
      removeFavorite(show.id);
    } else {
      // Map TvShow to Movie-like object
      addFavorite({
        id: show.id,
        title: show.name,
        originalTitle: show.original_name ?? show.name,
        originalLanguage: show.original_language,
        release_date: show.first_air_date ?? "",
        overview: show.overview,
        poster_path: show.poster_path,
        vote_average: show.vote_average,
        backdropPath: show.backdrop_path ?? "", // fallback to empty string if not available
        voteCount: show.vote_count ?? 0, // fallback to 0 if not available
        popularity: show.popularity ?? 0, // fallback to 0 if not available
      });
    }
  };

  if (isLoading) return <div className="p-6 text-white">Loading...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Qel TV Shows</h1>

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

        {/* TV Shows Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tvShows.results.map((show: TvShow) => {
            const fav = isFavorite(show.id);
            return (
              <div
                key={show.id}
                className="relative bg-gray-800 rounded p-4 shadow hover:shadow-lg transition-shadow"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="rounded"
                />
                <h2 className="text-lg mt-2 font-bold">{show.name}</h2>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {show.overview}
                </p>
                <div className="flex items-center text-yellow-400 mt-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-500 mr-1" />
                  {show.vote_average.toFixed(1)}
                </div>
                <button
                  onClick={(e) => toggleFavorite(e, show)}
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
      </main>
    </div>
  );
}
