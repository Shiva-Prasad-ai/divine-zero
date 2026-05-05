import { BookingModal } from "../components/BookingModal";

export function BookingPage() {
  return (
    <main className="container">
      <section className="hero card">
        <h1>Booking</h1>
        <p>Select a time slot and confirm your charger reservation.</p>
      </section>
      <BookingModal />
    </main>
  );
}

