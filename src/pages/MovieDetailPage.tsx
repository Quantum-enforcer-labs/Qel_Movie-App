import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieById } from "../utils/fetching";

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genres: Genre[];
};

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movie/$movieId" });

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery<Movie | undefined, Error>({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieById(movieId),
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );

  if (error instanceof Error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <p className="text-xl text-red-500">Error: {error.message}</p>
      </div>
    );

  if (!movie)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <p className="text-xl">Movie not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded"
          />
          <div className="space-y-4">
            <p>{movie.overview}</p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average} / 10
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((g: Genre) => g.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
