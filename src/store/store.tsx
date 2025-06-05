import type { FavoritesState } from "../types/types";
import { create } from "zustand";

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  addFavorite: (movie) => {
    const existing = get().favorites.find((m) => m.id === movie.id);
    if (!existing) {
      set((state) => ({
        favorites: [...state.favorites, movie],
      }));
    }
  },
  removeFavorite: (id) => {
    set((state) => ({
      favorites: state.favorites.filter((m) => m.id !== id),
    }));
  },
  isFavorite: (id) => {
    return get().favorites.some((m) => m.id === id);
  },
}));
