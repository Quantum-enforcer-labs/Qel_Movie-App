import { createFileRoute } from "@tanstack/react-router";
import { MovieDetailPage } from "../../pages/MovieDetailPage";

export const Route = createFileRoute("/movie/$movieId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MovieDetailPage />
    </div>
  );
}
