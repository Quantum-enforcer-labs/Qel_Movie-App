import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchTvShowById } from "../utils/fetching";

type Genre = { id: number; name: string };

type TvShow = {
  name: string;
  poster_path: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  genres: Genre[];
};

export function TvShowDetailPage() {
  const { tvShowId } = useParams({ from: "/tvshow/$tvShowId" });

  const {
    data: tvShow,
    isLoading,
    error,
  } = useQuery<TvShow | undefined, Error>({
    queryKey: ["tvshow", tvShowId],
    queryFn: () => fetchTvShowById(tvShowId),
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

  if (!tvShow)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <p className="text-xl">TV Show not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{tvShow.name}</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
            alt={tvShow.name}
            className="w-full md:w-1/3 rounded"
          />
          <div className="space-y-4">
            <p>{tvShow.overview}</p>
            <p>
              <strong>First Air Date:</strong> {tvShow.first_air_date}
            </p>
            <p>
              <strong>Rating:</strong> {tvShow.vote_average} / 10
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {tvShow.genres.map((g: Genre) => g.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
