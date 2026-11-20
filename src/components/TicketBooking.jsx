import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { getStoredEvents } from "../data/eventsData";

const API_URL = "http://localhost:3001";

const TicketBooking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { setBooking } = useBooking();

  const [event, setEvent] = useState(null);
  const [quantities, setQuantities] = useState({ regular: 0, vip: 0, vvip: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URL}/events/${eventId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setEvent(data);
      } catch {
        const localEvent = getStoredEvents().find(
          (ev) => String(ev.id) === String(eventId)
        );
        if (localEvent) {
          setEvent(localEvent);
        } else {
          setError("Event not found");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleQuantityChange = (tierKey, delta, maxAvailable) => {
    setQuantities((prev) => {
      const nextValue = (prev[tierKey] || 0) + delta;
      return {
        ...prev,
        [tierKey]: Math.max(0, Math.min(maxAvailable, nextValue)),
      };
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16 text-gray-600 font-medium">
        Loading ticket options...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-10 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
        Error: {error}
      </div>
    );
  }

  if (!event) return null;

  const ticketEntries = Array.isArray(event.tickets)
    ? event.tickets.map((t) => ({
        key: t.id,
        label: t.name,
        price: t.price,
        left: t.available,
      }))
    : Object.entries(event.tickets || {}).map(([key, val]) => ({
        key,
        label: key.toUpperCase(),
        price: val.price,
        left: val.left,
      }));

  const totalTickets = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const totalCost = ticketEntries.reduce(
    (sum, tier) => sum + tier.price * (quantities[tier.key] || 0),
    0
  );

  const handleProceedToCheckout = (e) => {
    e.preventDefault();
    if (totalTickets === 0) return;

    const normalizedTickets = {};
    ticketEntries.forEach((tier) => {
      normalizedTickets[tier.key] = { price: tier.price, left: tier.left };
    });

    setBooking({
      event: {
        ...event,
        name: event.name || event.title,
        venue: event.venue || event.location,
        tickets: normalizedTickets,
      },
      tickets: quantities,
      total: totalCost,
    });

    navigate("/checkout");
  };

  return (
    <section className="max-w-3xl mx-auto my-8 p-6 sm:p-8 bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Select Tickets: {event.name || event.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {event.date} • {event.venue || event.location}
        </p>
      </div>

      <form onSubmit={handleProceedToCheckout} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ticketEntries.map((tier) => {
            const qty = quantities[tier.key] || 0;
            const isSelected = qty > 0;

            return (
              <div
                key={tier.key}
                className={`flex sm:flex-col justify-between items-center p-5 rounded-xl border transition-all ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/40 shadow-sm"
                    : "border-gray-200 bg-gray-50/50 hover:border-gray-300"
                }`}
              >
                <div className="sm:text-center">
                  <span className="inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-100 text-indigo-800 mb-2">
                    {tier.label}
                  </span>
                  <p className="text-xl font-extrabold text-gray-900">
                    KES {tier.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{tier.left} tickets left</p>
                </div>

                <div className="flex items-center gap-3 sm:mt-5">
                  <button
                    type="button"
                    aria-label={`Decrease ${tier.label}`}
                    onClick={() => handleQuantityChange(tier.key, -1, tier.left)}
                    disabled={qty === 0}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-100 disabled:opacity-40"
                  >
                    -
                  </button>

                  <span data-testid={`qty-${tier.key}`} className="w-6 text-center text-lg font-bold text-gray-900">
                    {qty}
                  </span>

                  <button
                    type="button"
                    aria-label={`Increase ${tier.label}`}
                    onClick={() => handleQuantityChange(tier.key, 1, tier.left)}
                    disabled={qty >= tier.left}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-100 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <p className="text-gray-600">
              Total Tickets: <span className="font-bold text-gray-900">{totalTickets}</span>
            </p>
            <p className="text-lg text-gray-700">
              Total Cost:{" "}
              <span className="text-2xl font-extrabold text-indigo-600">
                KES {totalCost.toLocaleString()}
              </span>
            </p>
          </div>

          <button
            type="submit"
            disabled={totalTickets === 0}
            className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-black hover:bg-amber-300 disabled:opacity-50 transition"
          >
            Proceed to Payment →
          </button>
        </div>
      </form>
    </section>
  );
};

export default TicketBooking;
