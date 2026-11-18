import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3001/events";

const INITIAL_EVENTS = [
  {
    id: "1",
    title: "SolFest 2026",
    category: "Concert",
    date: "2026-12-12",
    venue: "Uhuru Gardens, Nairobi",
    image: "https://unsplash.com",
    description:
      "East Africa's biggest end-of-year music festival celebrating Kenyan sound, live bands, and electrifying stage performances.",
    tickets: [
      { id: "regular", name: "Regular", price: 2500, available: 150 },
      { id: "vip", name: "VIP", price: 6000, available: 50 },
      { id: "vvip", name: "VVIP", price: 12000, available: 20 },
    ],
  },
  {
    id: "2",
    title: "Vulai Show",
    category: "Comedy & Arts",
    date: "2026-11-28",
    venue: "Kenya National Theatre, Nairobi",
    image: "https://unsplash.com",
    description:
      "An unforgettable night of live stand-up comedy, spoken word, and theatrical storytelling featuring top local headliners.",
    tickets: [
      { id: "regular", name: "Regular", price: 1500, available: 80 },
      { id: "vip", name: "VIP", price: 3000, available: 30 },
      { id: "vvip", name: "VVIP", price: 5000, available: 10 },
    ],
  },
  {
    id: "3",
    title: "Ajax vs Bayern Munich",
    category: "Sports",
    date: "2026-12-05",
    venue: "Johan Cruijff ArenA, Amsterdam",
    image: "https://unsplash.com",
    description:
      "European football giants clash under the floodlights in a high-stakes showdown packed with world-class talent.",
    tickets: [
      { id: "regular", name: "Regular", price: 4500, available: 200 },
      { id: "vip", name: "VIP", price: 9500, available: 60 },
      { id: "vvip", name: "VVIP", price: 18000, available: 15 },
    ],
  },
  {
    id: "4",
    title: "KulaKula Food & Music Festival",
    category: "Food & Culture",
    date: "2026-12-19",
    venue: "Carnivore Grounds, Nairobi",
    image: "https://unsplash.com",
    description:
      "A vibrant culinary and music experience bringing together street food chefs, nyama choma masters, and live DJs.",
    tickets: [
      { id: "regular", name: "Regular", price: 1200, available: 120 },
      { id: "vip", name: "VIP", price: 2800, available: 40 },
      { id: "vvip", name: "VVIP", price: 5500, available: 15 },
    ],
  },
  {
    id: "5",
    title: "Nairobi Tech & Innovation Summit",
    category: "Tech & Business",
    date: "2027-01-16",
    venue: "KICC, Nairobi",
    image: "https://unsplash.com",
    description:
      "Connect with software engineers, startup founders, and investors shaping the future of African technology.",
    tickets: [
      { id: "regular", name: "Regular", price: 2000, available: 100 },
      { id: "vip", name: "VIP", price: 5000, available: 35 },
      { id: "vvip", name: "VVIP", price: 10000, available: 12 },
    ],
  },
  {
    id: "6",
    title: "Rift Valley Sunset Jazz & Wine",
    category: "Concert",
    date: "2027-01-30",
    venue: "Lake Naivasha Waterfront",
    image: "https://unsplash.com",
    description:
      "Smooth Afro-jazz melodies by the lakeside paired with artisan wines and panoramic Rift Valley sunset views.",
    tickets: [
      { id: "regular", name: "Regular", price: 3000, available: 90 },
      { id: "vip", name: "VIP", price: 6500, available: 30 },
      { id: "vvip", name: "VVIP", price: 11000, available: 10 },
    ],
  },
];

function EventList() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => {});
  }, []);

  const categories = ["All", ...new Set(events.map((event) => event.category))];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Upcoming Events
        </h1>
        <p className="text-gray-600 mt-2 text-base sm:text-lg">
          Discover concerts, sports clashes, comedy nights, and food
          festivals—grab your tickets before they sell out.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="w-full md:w-80">
          <label htmlFor="event-search" className="sr-only">
            Search events
          </label>
          <input
            id="event-search"
            type="text"
            placeholder="Search by event name or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500 text-lg font-medium">
            No events match "{searchTerm}".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const startingPrice = event.tickets?.length
              ? Math.min(...event.tickets.map((t) => t.price))
              : null;

            return (
              <article
                key={event.id}
                className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-shadow duration-200"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/90 text-white backdrop-blur-sm">
                    {event.category}
                  </span>
                </div>

                <div className="flex flex-col flex-grow p-5">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                    {event.title}
                  </h2>

                  <div className="mt-2 space-y-1 text-xs sm:text-sm text-gray-500">
                    <p className="flex items-center gap-1.5 font-medium text-gray-700">
                      <span>Date:</span>
                      <span>
                        {new Date(event.date).toLocaleDateString("en-KE", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span>Venue:</span>
                      <span>{event.venue}</span>
                    </p>
                  </div>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-3 flex-grow">
                    {event.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    {startingPrice !== null && (
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">
                          From
                        </span>
                        <span className="text-base font-extrabold text-gray-900">
                          KES {startingPrice.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <Link
                      to={`/events/${event.id}`}
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ml-auto"
                    >
                      Get Tickets
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
export default EventList;