import { RouteSummaryCard } from "../components/RouteSummaryCard";

export function TripSummaryPage() {
  return (
    <main className="container">
      <section className="animated-enter">
        <h1 style={{ marginBottom: "24px" }}>Your Trip Summary</h1>
        <RouteSummaryCard />
      </section>
    </main>
  );
}
