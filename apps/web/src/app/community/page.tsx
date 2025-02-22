import { LAUNCH_COMPETITION_FORM_LINk } from "@/constants";
import Link from "next/link";

export default function Community() {
  return (
    <div className="mt-10 p-4 md:p-8 md:pt-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-center text-2xl  font-bold text-[#4a5240] md:mb-12 md:text-4xl">
          Community section
        </h1>

        <div className="rounded-lg border border-primary/30 p-4  shadow-lg transition-shadow hover:shadow-none md:p-8">
          <h2 className="mb-4 text-lg font-semibold text-[#4a5240] md:text-2xl">
            Host Your Competition
          </h2>
          <p className="mb-6 text-[#4a5240]">
            If you want to host the competition please fill out the Form
          </p>

          <Link
            href={LAUNCH_COMPETITION_FORM_LINk}
            target="_blank"
            className="inline-block w-full rounded-md bg-primary px-6 py-3 text-center text-white transition-colors hover:bg-primary/80 md:w-auto"
          >
            Form
          </Link>
        </div>
      </div>
    </div>
  );
}
