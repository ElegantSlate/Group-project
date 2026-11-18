import React from 'react';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Banner Section with Wallpaper Background */}
      <section className="relative w-full h-[75vh] bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/festival-wallpaper.jpg')] bg-cover bg-center bg-no-repeat flex justify-center items-center text-center px-4">
        
        <div className="flex flex-col items-center max-w-2xl mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-wide">
            Welcome to Empire
          </h1>
          
          {/* --- PROPERLY SIZED MIDDLE IMAGE --- */}
          <img 
            src="/gp.jpg" 
            alt="Event Graphic" 
            className="w-48 sm:w-64 md:w-72 h-36 sm:h-48 md:h-52 object-cover rounded-xl my-4 shadow-2xl border-2 border-white/20" 
          />

          <p className="text-sm md:text-base text-slate-300 mt-2">
            2026 Empire EventHub. All rights reserved.
          </p>
        </div>

      </section>
    </div>
  );
}

export default Home;