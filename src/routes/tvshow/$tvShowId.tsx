import { createFileRoute } from "@tanstack/react-router";
import { TvShowDetailPage } from "../../pages/TvShowDetailPage";

export const Route = createFileRoute("/tvshow/$tvShowId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <TvShowDetailPage />
    </div>
  );
}
