export const fetchMovies = async (page = 1, genreId?: number) => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=4b4590cdb3744fe99ca64b22ba223f6e&include_adult=false&language=en-US&page=${page}`;
  if (genreId) url += `&with_genres=${genreId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
};

export const fetchTvShows = async (page = 1, genreId?: number) => {
  let url = `https://api.themoviedb.org/3/discover/tv?api_key=4b4590cdb3744fe99ca64b22ba223f6e&include_adult=false&language=en-US&page=${page}`;
  if (genreId) url += `&with_genres=${genreId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch TV shows");
  return res.json();
};

export const searchMovies = async (query: string) => {
  const BASE_URL = "https://api.themoviedb.org/3";

  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=4b4590cdb3744fe99ca64b22ba223f6e&query=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Search failed");
  return res.json();
};

export const fetchMovieById = async (id: string | number) => {
  const BASE_URL = "https://api.themoviedb.org/3";

  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=4b4590cdb3744fe99ca64b22ba223f6e&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
};
export const fetchTvShowById = async (id: string) => {
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=4b4590cdb3744fe99ca64b22ba223f6e&language=en-US`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch TV show:", error);
    throw error;
  }
};
export const fetchMovieGenres = async () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=4b4590cdb3744fe99ca64b22ba223f6e&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movie genres");
  const data = await res.json();
  return data.genres;
};

export const fetchTvGenres = async () => {
  const url = `https://api.themoviedb.org/3/genre/tv/list?api_key=4b4590cdb3744fe99ca64b22ba223f6e&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch TV genres");
  const data = await res.json();
  return data.genres;
};
