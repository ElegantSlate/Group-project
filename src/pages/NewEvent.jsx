import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredEvents, saveStoredEvents } from "../data/eventsData";

export default function NewEvent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Music & Culture");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    const events = getStoredEvents();
    const basePrice = Number(regularPrice) || 1000;

    const created = {
      id: String(Date.now()),
      name: title,
      title,
      category,
      date,
      time: time || "6:00 PM",
      venue,
      location: venue,
      description,
      image:
        image.trim() ||
        "https://unsplash.com",
      tickets: {
        regular: { price: basePrice, left: 100 },
        vip: { price: basePrice * 2, left: 40 },
        vvip: { price: basePrice * 4, left: 15 },
      },
    };

    saveStoredEvents([created, ...events]);
    navigate("/events");
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-extrabold text-slate-900">Create New Event</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <input
          required
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-300 p-3 text-slate-900"
          >
            <option value="Music & Culture">Music & Culture</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            <option value="Technology">Technology</option>
          </select>
          <input
            required
            type="number"
            min="0"
            placeholder="Regular Ticket Price (KES)"
            value={regularPrice}
            onChange={(e) => setRegularPrice(e.target.value)}
            className="rounded-lg border border-slate-300 p-3 text-slate-900"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-slate-300 p-3 text-slate-900"
          />
          <input
            placeholder="Time (e.g., 7:00 PM)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-lg border border-slate-300 p-3 text-slate-900"
          />
        </div>
        <input
          required
          placeholder="Venue (e.g., Uhuru Gardens, Nairobi)"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
        />
        <input
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
        />
        <textarea
          required
          rows="3"
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700"
        >
          Publish Event
        </button>
      </form>
    </section>
  );
}
