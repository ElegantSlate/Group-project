import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import { getStoredBookings } from "./data/eventsData";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import CheckoutPage from "./pages/CheckoutPage";
import NewEvent from "./pages/NewEvent";
import NotFound from "./pages/NotFound";

function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">About Empire</h1>
      <p className="text-lg text-slate-600 leading-relaxed mb-6">
        Empire is Nairobi’s premier event discovery and ticket booking platform.
        From live concerts and cultural festivals to international sports matches
        and tech conferences, we connect people to unforgettable experiences.
      </p>
      <Link
        to="/events"
        className="inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
      >
        Explore Upcoming Events
      </Link>
    </section>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Contact Us</h1>
      <p className="text-slate-600 mb-8">
        Have questions about an event or ticket booking? Reach out to our Nairobi team.
      </p>

      {sent ? (
        <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-green-800 font-medium">
          Message received! Our support team will reply shortly.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <input
            type="text"
            required
            placeholder="Your Name"
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
          />
          <textarea
            rows="4"
            required
            placeholder="How can we help?"
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 py-3 font-bold text-white hover:bg-purple-700"
          >
            Send Message
          </button>
        </form>
      )}
    </section>
  );
}

function AuthPage({ mode }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h1>
        {submitted ? (
          <div className="text-center space-y-4">
            <p className="text-green-700 font-semibold">
              {mode === "login" ? "Logged in successfully!" : "Account created!"}
            </p>
            <Link
              to="/events"
              className="inline-block rounded-lg bg-purple-600 px-5 py-2.5 text-white font-semibold"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            {mode === "signup" && (
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
              />
            )}
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-purple-600 py-3 font-bold text-white hover:bg-purple-700"
            >
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function BookingsHistoryPage() {
  const bookings = getStoredBookings();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600 mb-4">You haven't booked any tickets yet.</p>
          <Link to="/events" className="font-semibold text-purple-600 underline">
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {b.eventTitle || b.eventName || `Event #${b.eventId}`}
                </h3>
                <p className="text-sm text-slate-600">
                  Booked by <span className="font-medium">{b.name || b.customerName}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-extrabold text-purple-700">
                  KES {(b.total || b.totalCost || 0).toLocaleString()}
                </p>
                <span className="inline-block rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-800">
                  Confirmed
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/new" element={<NewEvent />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/events/:eventId/book" element={<EventDetail />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/bookings" element={<BookingsHistoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BookingProvider>
  );
}
