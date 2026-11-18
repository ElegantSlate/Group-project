
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Zaituni Live",
    category: "Music & culture",
    date: "2026-12-05",
    time: "9:00 AM",
    venue: "Covo, Hurlingham",
    price: "KSh 2,500",
    description:
      "An evening live performance by Zaituni and the clan Band.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVOHxu_FMXpYB_nNDkU8RMVDxS37-zsoJEMZVpEXxqxw&s=1024",
},
  {
    id: 2,
    title: "Sol Fest",
    category: "Music & culture",
    date: "2026-12-(17-19) ",
    time: "4:00 PM",
    venue: "Uhuru Gardens, Nairobi",
    price: "KSh 1,500",
    description:
      "The massive closing-day concert featuring high-energy crowds,nostalgic 2019 Gengetone sets and the heritage collective.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoEZxo9CqjGkUt3fZifiiXWmm9v1SP2ygFbBYggBfr5A&s=1024",
  },
  {
    id: 3,
    title: "FC Bayern Munich VS AFC Ajax Match",
    category: "sports",
    date: "2027-01-5",
    time: "11:00 AM",
    venue: "Raila Omollo Stadium, Nairobi",
    price: "KSh 45000",
    description:
      "come enjoy the match and take photographs with the non cholant OLISE and the ballon dior winner Harry Cane and not to forget to launch the newly built 60000 capacity stadium.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbBMd2I_g51Tkw9YlxcD2dUBmGl1Tv1Hh6Mi9G5dWFWg&s=1024",
  },
  {
    id: 4,
    title: "Business & Startup Expo",
    category: "Business",
    date: "2027-01-16",
    time: "8:30 AM",
    venue: "Sarit Expo Centre, Nairobi",
    price: "KSh 2,000",
    description:
      "Connect with entrepreneurs, discover new business ideas, meet potential partners, and learn practical strategies for growing a startup.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900",
  },
  {
    id: 5,
    title: "Vulai Festival",
    category: "music & culture",
    date: "2026-11-28",
    time: "4:00 PM",
    venue: "Utalii sports ground, Nairobi",
    price: "KSh 2,000",
    description:
      "Non-stop traditional and contemporary Luhya music,culture showcases,food experience and performances.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdiZ7hFIUlU3oJNP6y7sQldkZ-IVgSQvw1as9IqnUD4Q&s=1024",
  },
  {
    id: 6,
    title: "Innovation & AI Conference",
    category: "Technology",
    date: "2027-02-06",
    time: "9:30 AM",
    venue: "Two Rivers, Nairobi",
    price: "KSh 3,000",
    description:
      "Discover emerging AI tools, practical innovations, and new opportunities shaping the future of business and software development.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900",
  },
];

const formatDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function Eventlist() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(events.map((event) => event.category)),
  ];

  const upcomingEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase());

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
            {upcomingEvents.map((event) => (
              <article
                key={event.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Event image */}
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
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
                    {event.title}
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
                      <span>{event.venue}</span>
                    </p>
                  </div>

                  {/* Price and details button */}
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5 mt-5">
                    <div>
                      <p className="text-xs text-slate-500">Tickets from</p>
                      <p className="text-lg font-extrabold text-indigo-700">
                        {event.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-lg font-bold text-slate-800">
              No events found
            </p>
            <p className="mt-2 text-slate-500">
              Try a different search term or category.
            </p>
          </div>
        )}

        {/* Event details modal */}
        {selectedEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="event-modal-title"
              className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="h-56 w-full bg-slate-200 object-cover"
              />

              <div className="p-6 sm:p-8">
                <span className="text-sm font-bold text-indigo-600">
                  {selectedEvent.category}
                </span>

                <h2
                  id="event-modal-title"
                  className="mt-2 text-2xl font-extrabold text-slate-900"
                >
                  {selectedEvent.title}
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  {selectedEvent.description}
                </p>

                <div className="mt-5 space-y-3 text-sm text-slate-700">
                  <p>📅 {formatDate(selectedEvent.date)}</p>
                  <p>🕒 {selectedEvent.time}</p>
                  <p>📍 {selectedEvent.venue}</p>
                  <p className="font-bold text-indigo-700">
                    Ticket price: {selectedEvent.price}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="mt-7 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Eventlist;
