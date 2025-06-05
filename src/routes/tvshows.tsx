import { createFileRoute } from "@tanstack/react-router";
import TvShows from "../pages/TvShows";

export const Route = createFileRoute("/tvshows")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <TvShows />
    </div>
  );
}
