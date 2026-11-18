import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Checkout from "../components/Checkout";
import { useBooking } from "../context/BookingContext";

jest.mock("../context/BookingContext");

const booking = {
  event: {
    id: 1,
    name: "Nairobi Jazz Nights",
    date: "2026-12-05",
    venue: "Alliance Francaise",
    tickets: {
      regular: { price: 1500, left: 120 },
      vip: { price: 3500, left: 40 },
    },
  },
  tickets: { regular: 2, vip: 0 },
  total: 3000,
};

const setup = () =>
  render(
    <MemoryRouter>
      <Checkout />
    </MemoryRouter>
  );

beforeEach(() => {
  useBooking.mockReturnValue({ booking, clearBooking: jest.fn() });
});

test("shows a message when no tickets are selected", () => {
  useBooking.mockReturnValue({ booking: null, clearBooking: jest.fn() });
  setup();
  expect(screen.getByText(/no tickets selected/i)).toBeInTheDocument();
});

test("shows the booking summary and total", () => {
  setup();
  expect(screen.getByText("Nairobi Jazz Nights")).toBeInTheDocument();
  expect(screen.getByTestId("total")).toHaveTextContent("3000");
});

test("shows an error when the form is empty", async () => {
  global.fetch = jest.fn();
  setup();
  await userEvent.click(screen.getByRole("button", { name: /confirm booking/i }));
  expect(screen.getByRole("alert")).toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();
});

test("submits the booking and shows the confirmation", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true });
  setup();
  await userEvent.type(screen.getByLabelText(/full name/i), "Jane Doe");
  await userEvent.type(screen.getByLabelText(/email address/i), "jane@example.com");
  await userEvent.click(screen.getByRole("button", { name: /confirm booking/i }));

  expect(await screen.findByText(/booking confirmed/i)).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(2); // POST booking, PATCH stock
  expect(global.fetch.mock.calls[0][0]).toBe("http://localhost:3001/bookings");
});