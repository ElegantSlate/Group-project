import { useState } from "react";
import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import {
  addStoredBooking,
  getStoredEvents,
  saveStoredEvents,
} from "../data/eventsData";

const API = "http://localhost:3001";

export default function Checkout() {
  const { booking, clearBooking } = useBooking();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState(null);

  if (receipt) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 text-center text-slate-900 shadow-xl">
        <h2 className="mb-2 text-2xl font-bold text-green-700">
          Payment & Booking Confirmed! 😁
        </h2>
        <p className="mb-4 text-slate-600">
          Thanks, <span className="font-semibold">{receipt.name}</span>! Your receipt has been sent to{" "}
          <span className="font-semibold">{receipt.email}</span>.
        </p>

        <div className="mb-5 space-y-1 rounded-xl bg-slate-100 p-4 text-left text-sm text-slate-800">
          <p><span className="font-semibold">Event:</span> {receipt.eventTitle}</p>
          <p><span className="font-semibold">Transaction ID:</span> {receipt.transactionId}</p>
          <p><span className="font-semibold">Method:</span> {receipt.paymentMethod.toUpperCase()}</p>
          <p><span className="font-semibold">Amount Paid:</span> KES {receipt.total.toLocaleString()}</p>
          <p><span className="font-semibold">Status:</span> <span className="font-bold text-green-700">PAID</span></p>
        </div>

        <div className="flex justify-center gap-4">
          <Link to="/bookings" className="font-semibold text-purple-700 underline hover:text-purple-600">
            View My Bookings
          </Link>
          <Link to="/events" className="font-semibold text-slate-700 underline hover:text-slate-900">
            Browse more events
          </Link>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-white/10 p-6 text-center text-white">
        <h2 className="mb-2 text-2xl font-bold">No tickets selected</h2>
        <Link to="/events" className="font-semibold text-amber-300 underline">
          Browse events
        </Link>
      </div>
    );
  }

  const { event, tickets, total } = booking;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.includes("@")) {
      setError("Enter your name and a valid email.");
      return;
    }

    if (paymentMethod === "mpesa" && !/^(07|01|\+2547|\+2541)\d{8}$/.test(phone.trim())) {
      setError("Enter a valid Kenyan M-Pesa number (e.g. 0712345678).");
      return;
    }

    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s+/g, "").length < 16 || !expiry.trim() || cvv.trim().length < 3) {
        setError("Enter valid 16-digit card details, expiry, and CVV.");
        return;
      }
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const transactionId =
        paymentMethod === "mpesa"
          ? `MPESA-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
          : `CARD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      const bookingPayload = {
        id: String(Date.now()),
        eventId: event.id,
        eventTitle: event.name || event.title,
        eventName: event.name || event.title,
        name: name.trim(),
        email: email.trim(),
        tickets,
        total,
        paymentMethod,
        paymentAccount:
          paymentMethod === "mpesa" ? phone.trim() : `**** ${cardNumber.slice(-4)}`,
        paymentStatus: "PAID",
        transactionId,
        createdAt: new Date().toISOString(),
      };

      const updatedStock = {};
      for (const type in event.tickets) {
        updatedStock[type] = {
          ...event.tickets[type],
          left: Math.max(0, event.tickets[type].left - (tickets[type] || 0)),
        };
      }

      addStoredBooking(bookingPayload);
      const updatedEvents = getStoredEvents().map((ev) =>
        String(ev.id) === String(event.id) ? { ...ev, tickets: updatedStock } : ev
      );
      saveStoredEvents(updatedEvents);

      try {
        await fetch(`${API}/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingPayload),
        });
        await fetch(`${API}/events/${event.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tickets: updatedStock }),
        });
      } catch {
        // Ignore if json-server is offline
      }

      clearBooking();
      setReceipt(bookingPayload);
    } catch {
      setError("Could not process your payment. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-6 p-4 md:grid-cols-2">
      <section className="h-fit rounded-xl bg-black/25 p-5">
        <h2 className="text-xl font-bold">{event.name || event.title}</h2>
        <p className="text-sm text-white/80">
          {event.date}, {event.venue}
        </p>
        <ul className="my-4 space-y-1 border-y border-white/20 py-3">
          {Object.entries(tickets)
            .filter(([, qty]) => qty > 0)
            .map(([type, qty]) => (
              <li key={type} className="flex justify-between">
                <span>
                  {qty} x {type.toUpperCase()}
                </span>
                <span>KES {(qty * event.tickets[type].price).toLocaleString()}</span>
              </li>
            ))}
        </ul>
        <p data-testid="total" className="text-lg font-bold text-amber-300">
          Total: KES {total.toLocaleString()}
        </p>
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-xl bg-black/25 p-5">
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border bg-white p-2 text-black"
        />

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border bg-white p-2 text-black"
        />

        <div className="mt-1">
          <span className="mb-1.5 block font-medium">Payment Method</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("mpesa")}
              className={`rounded p-2 font-semibold transition ${
                paymentMethod === "mpesa"
                  ? "bg-green-600 text-white"
                  : "bg-white/90 text-black hover:bg-white"
              }`}
            >
              M-Pesa
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`rounded p-2 font-semibold transition ${
                paymentMethod === "card"
                  ? "bg-amber-400 text-black"
                  : "bg-white/90 text-black hover:bg-white"
              }`}
            >
              Card
            </button>
          </div>
        </div>

        {paymentMethod === "mpesa" ? (
          <div className="flex flex-col gap-1">
            <label htmlFor="phone">M-Pesa Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0712345678"
              className="rounded border bg-white p-2 text-black"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              className="rounded border bg-white p-2 text-black"
            />
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="expiry">Expiry</label>
                <input
                  id="expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="rounded border bg-white p-2 text-black"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  maxLength={4}
                  className="rounded border bg-white p-2 text-black"
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <p role="alert" className="text-yellow-200">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="mt-2 rounded bg-amber-400 p-2.5 font-semibold text-black hover:bg-amber-300 disabled:opacity-50"
        >
          {loading
            ? "Processing Payment..."
            : `Pay KES ${total.toLocaleString()} & Confirm`}
        </button>
      </form>
    </div>
);
}