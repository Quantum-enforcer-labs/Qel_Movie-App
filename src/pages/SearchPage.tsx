import { useQuery } from "@tanstack/react-query";
import { useSearch, Link } from "@tanstack/react-router";
import { searchMovies } from "../utils/fetching";
import type { Movie } from "../types/types";
import { AlertTriangle, Loader2 } from "lucide-react";

export function SearchPage() {
  const search = useSearch({ from: "/search" });
  const query = typeof search.query === "string" ? search.query.trim() : "";

  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
          <p className="text-xl text-gray-300">Loading movies...</p>
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
          <p className="text-gray-300">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="flex-grow p-4 md:p-8">
        <h2 className="text-xl mb-6 text-center font-extrabold">
          Search Results for: <span className="text-blue-400">{query}</span>
        </h2>

        {data?.results?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {data.results.map((movie: Movie) => (
              <Link
                to="/movie/$movieId"
                params={{ movieId: String(movie.id) }}
                key={movie.id}
                className="group"
              >
                <div className="bg-gray-800 text-white p-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-lg w-full aspect-[2/3] object-cover group-hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                  ) : (
                    <div className="bg-gray-700 rounded-lg aspect-[2/3] flex items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                  <div className="mt-2 font-medium text-sm md:text-base line-clamp-2">
                    {movie.title}
                  </div>
                  {movie.release_date && (
                    <div className="text-xs text-gray-400 mt-1">
                      ({new Date(movie.release_date).getFullYear()})
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          query && (
            <p className="text-center text-gray-400 mt-12 text-lg">
              No results found for "{query}"
            </p>
          )
        )}
      </main>
    </div>
  );
}
