export const INITIAL_EVENTS = [
  {
    id: "1",
    name: "Zaituni Live",
    title: "Zaituni Live",
    category: "Music & Culture",
    date: "2026-12-05",
    time: "9:00 AM",
    venue: "Covo, Hurlingham",
    location: "Covo, Hurlingham",
    description: "An evening live performance by Zaituni and the Clan Band.",
    image:
      "https://gstatic.com",
    tickets: {
      regular: { price: 2500, left: 50 },
      vip: { price: 5000, left: 25 },
      vvip: { price: 10000, left: 10 },
    },
  },
  {
    id: "2",
    name: "Sol Fest",
    title: "Sol Fest",
    category: "Music & Culture",
    date: "2026-12-18",
    time: "4:00 PM",
    venue: "Uhuru Gardens, Nairobi",
    location: "Uhuru Gardens, Nairobi",
    description:
      "The massive closing-day concert featuring high-energy crowds, nostalgic 2019 Gengetone sets and the heritage collective.",
    image:
      "https://gstatic.com",
    tickets: {
      regular: { price: 1500, left: 120 },
      vip: { price: 3500, left: 40 },
      vvip: { price: 7500, left: 15 },
    },
  },
  {
    id: "3",
    name: "FC Bayern Munich VS AFC Ajax Match",
    title: "FC Bayern Munich VS AFC Ajax Match",
    category: "Sports",
    date: "2027-01-05",
    time: "11:00 AM",
    venue: "Raila Odinga Stadium, Nairobi",
    location: "Raila Odinga Stadium, Nairobi",
    description:
      "Come enjoy the match and take photographs with Olise and Harry Kane at the launch of the newly built 60,000-capacity stadium.",
    image:
      "https://gstatic.com",
    tickets: {
      regular: { price: 5000, left: 200 },
      vip: { price: 15000, left: 50 },
      vvip: { price: 45000, left: 20 },
    },
  },
  {
    id: "4",
    name: "Business & Startup Expo",
    title: "Business & Startup Expo",
    category: "Business",
    date: "2027-01-16",
    time: "8:30 AM",
    venue: "Sarit Expo Centre, Nairobi",
    location: "Sarit Expo Centre, Nairobi",
    description:
      "Connect with entrepreneurs, discover new business ideas, meet potential partners, and learn practical strategies for growing a startup.",
    image:
      "https://unsplash.com",
    tickets: {
      regular: { price: 2000, left: 80 },
      vip: { price: 4500, left: 30 },
      vvip: { price: 9000, left: 10 },
    },
  },
  {
    id: "5",
    name: "Vulai Festival",
    title: "Vulai Festival",
    category: "Music & Culture",
    date: "2026-11-28",
    time: "4:00 PM",
    venue: "Utalii Sports Ground, Nairobi",
    location: "Utalii Sports Ground, Nairobi",
    description:
      "Non-stop traditional and contemporary Luhya music, culture showcases, food experience and performances.",
    image:
      "https://gstatic.com",
    tickets: {
      regular: { price: 2000, left: 100 },
      vip: { price: 5000, left: 35 },
      vvip: { price: 10000, left: 12 },
    },
  },
  {
    id: "6",
    name: "Innovation & AI Conference",
    title: "Innovation & AI Conference",
    category: "Technology",
    date: "2027-02-06",
    time: "9:30 AM",
    venue: "Two Rivers, Nairobi",
    location: "Two Rivers, Nairobi",
    description:
      "Discover emerging AI tools, practical innovations, and new opportunities shaping the future of business and software development.",
    image:
      "https://unsplash.com",
    tickets: {
      regular: { price: 3000, left: 75 },
      vip: { price: 6000, left: 25 },
      vvip: { price: 12000, left: 10 },
    },
  },
];

const EVENTS_KEY = "empire_events_v1";
const BOOKINGS_KEY = "empire_bookings_v1";

export function getStoredEvents() {
  const saved = localStorage.getItem(EVENTS_KEY);
  if (saved) return JSON.parse(saved);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(INITIAL_EVENTS));
  return INITIAL_EVENTS;
}

export function saveStoredEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

export function getStoredBookings() {
  const saved = localStorage.getItem(BOOKINGS_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function addStoredBooking(booking) {
  const current = getStoredBookings();
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify([booking, ...current]));
}
