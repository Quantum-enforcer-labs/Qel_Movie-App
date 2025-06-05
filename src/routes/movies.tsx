import { createFileRoute } from "@tanstack/react-router";
import Movies from "../pages/Movies";

export const Route = createFileRoute("/movies")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Movies />
    </div>
  );
}
