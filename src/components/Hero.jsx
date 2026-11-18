
import React, { useState } from "react";

function Hero() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  return (
    <section className="relative min-h-[650px] flex items-center justify-center overflow-hidden bg-slate-950">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=2000')",
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-purple-950/50"></div>

      {/* Hero content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">

        {/* Small label */}
        <span className="inline-block mb-6 px-5 py-2 rounded-full border border-purple-400/50 bg-purple-500/20 text-purple-200 text-sm font-semibold tracking-wider">
          ✨ YOUR NEXT EXPERIENCE STARTS HERE
        </span>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          Discover Events.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Create Memories.
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          From electrifying concerts to unforgettable experiences,
          find your next event and secure your tickets in just a few clicks.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-3xl mx-auto bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl"
        >
          <div className="flex items-center flex-1 px-4">
            <span className="text-xl mr-3">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search concerts, festivals, events..."
              className="w-full py-3 text-gray-800 outline-none bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-xl transition duration-300"
          >
            Search Events
          </button>
        </form>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <a
            href="#events"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-9 py-4 rounded-xl shadow-lg transition duration-300 hover:-translate-y-1"
          >
            Explore Events →
          </a>

          <a
            href="#about"
            className="border border-white/60 hover:bg-white hover:text-purple-900 text-white font-bold px-9 py-4 rounded-xl transition duration-300"
          >
            Learn More
          </a>

        </div>

        {/* Bottom information */}
        <div className="flex flex-wrap justify-center gap-8 mt-14 text-white">

          <div>
            <h3 className="text-2xl font-bold text-purple-300">Easy</h3>
            <p className="text-sm text-gray-300">Ticket Booking</p>
          </div>

          <div className="w-px bg-white/30"></div>

          <div>
            <h3 className="text-2xl font-bold text-purple-300">Fast</h3>
            <p className="text-sm text-gray-300">Secure Checkout</p>
          </div>

          <div className="w-px bg-white/30"></div>

          <div>
            <h3 className="text-2xl font-bold text-purple-300">Fun</h3>
            <p className="text-sm text-gray-300">Unforgettable Events</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
