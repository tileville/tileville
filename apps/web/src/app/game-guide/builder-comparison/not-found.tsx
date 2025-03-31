import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
      <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-6 max-w-md text-gray-600">
        Sorry, we couldnt find the page youre looking for. It might have been
        moved or deleted.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-md bg-primary px-6 py-2 font-semibold text-white hover:bg-primary/90"
        >
          Go Home
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary/10"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
