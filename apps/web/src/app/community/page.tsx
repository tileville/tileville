// import { Target } from "@/assets";
import Link from "next/link";

export default function Community() {
  return (
    <div className="py-8">
      <div className="fade-slide-in mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h1 className="mb-3 text-center text-4xl font-semibold">
          Community section
        </h1>

        <div className="grid md:grid-cols-4">
          <div className="rounded-md bg-primary/20 p-4 backdrop-blur-lg transition-colors hover:bg-primary/40">
            <h2 className="text-2xl font-semibold">Host Your Competition</h2>
            <p className="text-sm text-gray-600">
              If you want to host the competition please fill out the{" "}
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSdwNysGNvo5YRu88rQ1L36dT4swot4pXe1YedpHoKMdB50I8g/viewform"
                className="underline"
                target="_blank"
              >
                Form
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
