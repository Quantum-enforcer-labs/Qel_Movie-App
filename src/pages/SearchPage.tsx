import { useQuery } from "@tanstack/react-query";
import { useSearch, Link } from "@tanstack/react-router";
import { searchMovies } from "../utils/fetching";
import type { Movie } from "../types/types";
import { AlertTriangle } from "lucide-react";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-xl text-gray-300">Loading Qel Movies...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="flex flex-col items-center space-y-4">
          <AlertTriangle className="w-16 h-16 text-red-500" />
          <h2 className="text-2xl font-bold text-red-500">
            Oops! Something went wrong.
          </h2>
          <p className="text-gray-300">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="flex-grow p-4">
        <h2 className="text-xl mb-4 text-center font-extrabold">
          Search Results for: <strong>{query}</strong>
        </h2>

        {data?.results?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.results.map((movie: Movie) => (
              <Link
                to="/movie/$movieId"
                params={{ movieId: String(movie.id) }}
                key={movie.id}
              >
                <div className="bg-gray-800 text-white p-2 rounded shadow hover:scale-105 transition-transform">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded"
                    />
                  ) : (
                    <div className="bg-gray-700 h-48 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  <div className="mt-2 font-medium">{movie.title}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          query &&
          !isLoading && (
            <p className="text-center text-gray-300 mt-8">No results found.</p>
          )
        )}
      </main>
    </div>
  );
}
