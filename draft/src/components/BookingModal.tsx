import { useState } from "react";
import { useBooking } from "../hooks/useBooking";
import { useAppStore } from "../store/appStore";

export function BookingModal() {
  const selectedCharger = useAppStore((s) => s.selectedCharger);
  const setBookingDraft = useAppStore((s) => s.setBookingDraft);
  const bookingDraft = useAppStore((s) => s.bookingDraft);
  const bookingMutation = useBooking();
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  if (!selectedCharger) return <p>Select a charger first.</p>;

  const submitBooking = async () => {
    const result = await bookingMutation.mutateAsync({
      chargerId: selectedCharger.id,
      date: bookingDraft.date,
      slot: bookingDraft.slot,
    });
    setConfirmedId(result.bookingId);
  };

  return (
    <section className="card form">
      <h3>Book Charger</h3>
      <label>
        Date
        <input
          type="date"
          value={bookingDraft.date}
          onChange={(e) => setBookingDraft(e.target.value, bookingDraft.slot)}
        />
      </label>
      <label>
        Time slot
        <select
          value={bookingDraft.slot}
          onChange={(e) => setBookingDraft(bookingDraft.date, e.target.value)}
        >
          <option value="">Select slot</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
        </select>
      </label>
      <button
        className="btn-primary"
        onClick={submitBooking}
        disabled={!bookingDraft.date || !bookingDraft.slot || bookingMutation.isPending}
      >
        {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
      </button>
      {bookingMutation.isError && (
        <p className="error">{(bookingMutation.error as Error).message}</p>
      )}
      {confirmedId && <p className="success">Booking confirmed: {confirmedId}</p>}
    </section>
  );
}

