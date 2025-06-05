import { createFileRoute } from "@tanstack/react-router";
import FavoritesPage from "../pages/Favourite";

export const Route = createFileRoute("/favourites")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <FavoritesPage />
    </div>
  );
}
