import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  // { event, tickets: { regular: 0, vip: 0, vvip: 0 }, total }
  const [booking, setBooking] = useState(null);
  const clearBooking = () => setBooking(null);

  return (
    <BookingContext.Provider value={{ booking, setBooking, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
