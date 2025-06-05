export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  originalLanguage: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdropPath: string | null;
  vote_average: number;
  voteCount: number;
  popularity: number;
}

export interface TvShow {
  id: number;
  name: string;
  original_name: string;
  original_language: string;
  overview: string;
  first_air_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
}
export type FavoritesState = {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};
// src/types/genre.ts

export interface Genre {
  id: number;
  name: string;
}
