import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getStoredEvents } from "../data/eventsData";

const FALLBACK_BANNER =
  "https://unsplash.com";

const INITIAL_IMAGES = {
  "1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHcl9xzdqJWYKbx0NFqxJ7EKN6HBgETjQShQroLuAGIA&s=10",
  "2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp7J3_uIhTd08uJcnBzX3DUVfcR-V5T3i3bOKggLYWQQ&s=10",
  "3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKrqDWXUvaYJQpBNXqGk3nNjlDaAZHEbHrv7C2x4LgAg&s=10",
  "4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTM7xlsEd6C1agDShfZl0lSXr0OHAQEK3959y2_j3pvQ&s=10",
  "5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGsv4XQA8h48bCiYqnEU9LDrIpRqCb6bmsQ7oFrXmRCg&s",
  "6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPccWdqOCWd08pttnE4XSReWysdo9onyPw4uXiX6wfrw&s=10",
};

const resolveEventImage = (event) => {
  const idKey = String(event.id);
  if (
    !event.image ||
    event.image.includes("gstatic.com") ||
    event.image === "https://unsplash.com"
  ) {
    return INITIAL_IMAGES[idKey] || FALLBACK_BANNER;
  }
  return event.image;
};

const formatDate = (date) => {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

function Eventlist() {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const loaded = getStoredEvents().map((ev) => ({
      ...ev,
      image: resolveEventImage(ev),
    }));
    setEvents(loaded);
  }, []);

  useEffect(() => {
    const querySearch = searchParams.get("search");
    if (querySearch !== null) {
      setSearch(querySearch);
    }
  }, [searchParams]);

  const categories = [
    "All",
    ...new Set(events.map((event) => event.category)),
  ];

  const upcomingEvents = events.filter((event) => {
    const title = event.title || event.name || "";
    const venue = event.venue || event.location || "";
    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      venue.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
            Discover experiences
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Upcoming Events
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Find your next unforgettable experience. Explore events,
            discover new places, and get ready to make memories.
          </p>
        </div>

        {/* Search and category filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events or venues..."
            aria-label="Search events or venues"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 md:flex-1"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>

          <Link
            to="/events/new"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            + Add Event
          </Link>
        </div>

        {/* Event count */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Find Your Event
          </h2>

          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
            {upcomingEvents.length} events
          </span>
        </div>

        {/* Event cards */}
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => {
              const title = event.title || event.name;
              const venue = event.venue || event.location;
              const startingPrice =
                event.tickets?.regular?.price ??
                event.price ??
                1000;

              return (
                <article
                  key={event.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Event image */}
                  <div className="relative h-52 overflow-hidden bg-slate-200">
                    <img
                      src={event.image}
                      alt={title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_BANNER;
                      }}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm">
                      {event.category}
                    </span>
                  </div>

                  {/* Event information */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-bold leading-snug text-slate-900">
                      {title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {event.description}
                    </p>

                    <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                      <p className="flex items-start gap-3 text-sm text-slate-600">
                        <span aria-hidden="true">📅</span>
                        <span>
                          <span className="font-semibold text-slate-800">
                            {formatDate(event.date)}
                          </span>
                          <span className="block text-slate-500">
                            {event.time}
                          </span>
                        </span>
                      </p>

                      <p className="flex items-start gap-3 text-sm text-slate-600">
                        <span aria-hidden="true">📍</span>
                        <span>{venue}</span>
                      </p>
                    </div>

                    {/* Price & Book Tickets CTA */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div>
                        <span className="block text-xs text-slate-500">From</span>
                        <span className="text-lg font-extrabold text-slate-900">
                          {typeof startingPrice === "number"
                            ? `KES ${startingPrice.toLocaleString()}`
                            : startingPrice}
                        </span>
                      </div>

                      <Link
                        to={`/events/${event.id}`}
                        className="rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-300"
                      >
                        Book Tickets →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-600">
            No events matched your search.
          </div>
        )}
      </div>
    </section>
  );
}

export default Eventlist;
