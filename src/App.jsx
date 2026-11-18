import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx";
import NewEvent from "./pages/NewEvent.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import TicketingBooking from "./components/TicketBooking.jsx";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/new" element={<NewEvent />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/ticketing" element={<TicketingBooking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

