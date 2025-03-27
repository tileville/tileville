import React from "react";
import Link from "next/link";
import { ROADMAP_QUARTERS } from "../../community/roadmap/page";

export default function Roadmap() {
  return (
    <div className="mx-auto max-w-[1200px] p-4 pb-20 pt-20">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-5xl">
          TileVille Development Roadmap
        </h1>
        <p className="mt-4 text-lg">
          Our journey to build the ultimate blockchain city-building experience
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 hidden h-full w-0.5 bg-primary/50 md:block"></div>

        {/* Timeline sections */}
        <div className="relative space-y-16 md:ml-8">
          {ROADMAP_QUARTERS.map((quarter) => (
            <div key={quarter.id} className="relative">
              {/* Timeline dot */}
              <div
                className="absolute -left-10 top-0 hidden h-6 w-6 rounded-full md:block"
                style={{
                  backgroundColor:
                    quarter.status === "completed"
                      ? "#3EB489"
                      : quarter.status === "current"
                      ? "#3E8EB4"
                      : quarter.status === "upcoming"
                      ? "#B43E8E"
                      : "#8E8E8E",
                }}
              ></div>

              <div
                className={`rounded-xl border p-6 ${
                  quarter.status === "completed"
                    ? "border-[#3EB489]/50 bg-[#3EB489]/10"
                    : quarter.status === "current"
                    ? "border-[#3E8EB4]/50 bg-[#3E8EB4]/10"
                    : quarter.status === "upcoming"
                    ? "border-[#B43E8E]/50 bg-[#B43E8E]/10"
                    : "border-gray-500/50 bg-gray-500/10"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{quarter.title}</h2>
                  <span
                    className={`rounded-md px-3 py-1 text-sm font-medium uppercase ${
                      quarter.status === "completed"
                        ? "bg-[#3EB489]/20 text-[#3EB489]"
                        : quarter.status === "current"
                        ? "bg-[#3E8EB4]/20 text-[#3E8EB4]"
                        : quarter.status === "upcoming"
                        ? "bg-[#B43E8E]/20 text-[#B43E8E]"
                        : "bg-gray-500/20 text-gray-500"
                    }`}
                  >
                    {quarter.status}
                  </span>
                </div>

                <ul className="space-y-3">
                  {quarter.milestones.map((milestone, mIndex) => (
                    <li key={mIndex} className="flex items-start">
                      <span
                        className={`mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs ${
                          milestone.completed
                            ? "bg-[#3EB489] text-white"
                            : "border border-gray-400 bg-transparent"
                        }`}
                      >
                        {milestone.completed ? "✓" : ""}
                      </span>
                      <span
                        className={
                          milestone.completed
                            ? "text-base"
                            : "text-base text-gray-600"
                        }
                      >
                        {milestone.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-xl border border-primary bg-primary/10 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Help Shape Our Future
        </h2>
        <p className="mb-6 text-lg">
          The TileVille roadmap is influenced by our community. Share your ideas
          and feedback to help us build the features you want to see!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="https://t.me/tilevilleBugs"
            className="inline-block rounded-md bg-primary px-6 py-3 font-bold text-white hover:bg-primary/90"
          >
            Join Our Telegram
          </Link>
          <Link
            href="https://forms.gle/PyPU67YmDvQvZ7HF9"
            className="inline-block rounded-md border border-primary bg-transparent px-6 py-3 font-bold text-primary hover:bg-primary/10"
          >
            Submit Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}
