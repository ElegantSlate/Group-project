import Checkout from "../components/Checkout";

export default function CheckoutPage() {
  return (
    <section className="min-h-screen bg-[#800020] p-6 text-white">
      <h1 className="mb-4 text-center text-3xl font-bold">Checkout</h1>
      <Checkout />
    </section>
  );
}