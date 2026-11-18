import { useState } from "react";
import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";


const API = "http://localhost:3001";

export default function Checkout() {
  const { booking, clearBooking } = useBooking();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-green-700">Booking confirmed😁</h2>
        <p className="mb-4 text-gray-600">Thanks, {name}! We sent the details to {email}.</p>
        <Link to="/events" className="font-semibold text-purple-700 underline">
          Browse more events
       </Link>
</div>
    );
  }

  if (!booking) {
    return (
     <div className="mx-auto max-w-md p-6 text-center">
       <h2 className="mb-2 text-2xl font-bold">No tickets selected</h2>
        <Link to="/events" className="font-semibold text-purple-700 underline">
         Browse events
        </Link>
</div>
    );
  }

  const { event, tickets, total } = booking;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.includes("@")) {
      setError("Enter your name and a valid email.");
      return;
    }

    try {
      // 1. Save the booking
      const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          name,
          email,
          tickets,
          total,
          createdAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error();

      // 2. Reduce stock (send the FULL tickets object, json-server replaces it)
      const stock = {};
      for (const type in event.tickets) {
        stock[type] = {
          ...event.tickets[type],
          left: event.tickets[type].left - (tickets[type] || 0),
        };
      }
      await fetch(`${API}/events/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickets: stock }),
      });

      clearBooking();
      setDone(true);
    } catch {
      setError("Could not save your booking. Try again.");
    }
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-6 p-4 md:grid-cols-2">
  <section>
    <h2 className="text-xl font-bold">{event.name}</h2>
    <p>{event.date}, {event.venue}</p>
    <ul className="my-3">
      {Object.entries(tickets)
        .filter(([, qty]) => qty > 0)
        .map(([type, qty]) => (
          <li key={type}>
            {qty} x {type.toUpperCase()}: KES {qty * event.tickets[type].price}
          </li>
        ))}
    </ul>
    <p data-testid="total" className="font-bold">Total: KES {total}</p>
  </section>

  <form onSubmit={handleSubmit} className="flex flex-col gap-2">
  <label htmlFor="name">Full name</label>
  <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="border bg-white p-2 text-black" />

  <label htmlFor="email">Email address</label>
  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border bg-white p-2 text-black" />

  {error && <p role="alert" className="text-yellow-200">{error}</p>}
  <button className="bg-amber-400 p-2 font-semibold text-black hover:bg-amber-300">Confirm booking</button>
</form>
</div>
   
  );
}