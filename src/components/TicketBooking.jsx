import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001';

const TicketBooking = () => {
  const { eventId } = useParams(); // Parameterized route: /events/:eventId/book
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // 1. GET: Fetch event and ticket tiers from json-server
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URL}/events/${eventId}`);
        if (!res.ok) throw new Error('Event not found');
        const data = await res.json();

        setEvent(data);
        const initialQty = {};
        data.tickets.forEach((tier) => {
          initialQty[tier.id] = 0;
        });
        setQuantities(initialQty);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  // 2. Update ticket quantities bounded by 0 and available stock
  const handleQuantityChange = (tierId, delta, maxAvailable) => {
    setQuantities((prev) => {
      const nextValue = (prev[tierId] || 0) + delta;
      return {
        ...prev,
        [tierId]: Math.max(0, Math.min(maxAvailable, nextValue)),
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

  // 3. Derived totals
  const totalTickets = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const totalCost = event.tickets.reduce(
    (sum, tier) => sum + tier.price * (quantities[tier.id] || 0),
    0
  );

  // 4. POST & PATCH: Persist booking and update remaining inventory
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (totalTickets === 0 || !customerName.trim()) return;

    setSubmitting(true);
    try {
      const newBooking = {
        eventId: event.id,
        eventTitle: event.title,
        customerName: customerName.trim(),
        tickets: quantities,
        totalTickets,
        totalCost,
        bookedAt: new Date().toISOString(),
      };

      const postRes = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
      });
      if (!postRes.ok) throw new Error('Failed to create booking');

      const updatedTickets = event.tickets.map((tier) => ({
        ...tier,
        available: tier.available - (quantities[tier.id] || 0),
      }));

      await fetch(`${API_URL}/events/${event.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tickets: updatedTickets }),
      });

      navigate('/bookings');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto my-8 p-6 sm:p-8 bg-white rounded-2xl shadow-md border border-gray-100">
      {/* Event Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Book Tickets: {event.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {event.date} • {event.location}
        </p>
      </div>

      <form onSubmit={handleBookingSubmit} className="space-y-6">
        {/* Responsive Ticket Tier Cards (1 col mobile, 3 cols desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {event.tickets.map((tier) => {
            const qty = quantities[tier.id] || 0;
            const isSelected = qty > 0;

            return (
              <div
                key={tier.id}
                className={`flex sm:flex-col justify-between items-center p-5 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                    : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
                }`}
              >
                <div className="sm:text-center">
                  <span className="inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-100 text-blue-800 mb-2">
                    {tier.name}
                  </span>
                  <p className="text-xl font-extrabold text-gray-900">
                    KES {tier.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {tier.available} tickets left
                  </p>
                </div>

                {/* Quantity Stepper Controls */}
                <div className="flex items-center gap-3 sm:mt-5">
                  <button
                    type="button"
                    aria-label={`Decrease ${tier.name}`}
                    onClick={() => handleQuantityChange(tier.id, -1, tier.available)}
                    disabled={qty === 0}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    -
                  </button>

                  <span
                    data-testid={`qty-${tier.id}`}
                    className="w-6 text-center text-lg font-bold text-gray-900"
                  >
                    {qty}
                  </span>

                  <button
                    type="button"
                    aria-label={`Increase ${tier.name}`}
                    onClick={() => handleQuantityChange(tier.id, 1, tier.available)}
                    disabled={qty >= tier.available}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Attendee Input & Order Summary */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-4">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Attendee Full Name
            </label>
            <input
              id="customerName"
              type="text"
              placeholder="e.g., Jane Doe"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-3 border-t border-gray-200">
            <p className="text-gray-600">
              Total Tickets:{' '}
              <span className="font-bold text-gray-900">{totalTickets}</span>
            </p>
            <p className="text-lg text-gray-700">
              Total Cost:{' '}
              <span className="text-2xl font-extrabold text-blue-600">
                KES {totalCost.toLocaleString()}
              </span>
            </p>
          </div>

          <button
            type="submit"
            disabled={totalTickets === 0 || !customerName.trim() || submitting}
            className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {submitting ? 'Processing Booking...' : 'Confirm & Book Tickets'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default TicketBooking;
