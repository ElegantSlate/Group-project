import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-extrabold text-purple-600">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-slate-900">Page Not Found</h2>
      <p className="mt-2 text-slate-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
      >
        Back to Home
      </Link>
    </section>
  );
}
