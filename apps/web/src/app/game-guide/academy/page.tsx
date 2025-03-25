import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TileVille Academy",
  description:
    "Learn the art and science of city building and blockchain gaming",
};

const courses = [
  {
    id: "urban-planning-101",
    title: "Urban Planning 101",
    description:
      "Learn the fundamentals of city planning, zoning, and sustainable development",
    level: "Beginner",
    modules: 5,
    duration: "3 hours",
  },
  {
    id: "blockchain-gaming",
    title: "Blockchain Gaming Fundamentals",
    description:
      "Understand how blockchain technology powers next-generation gaming experiences",
    level: "Beginner",
    modules: 4,
    duration: "2.5 hours",
  },
  {
    id: "sustainable-cities",
    title: "Building Sustainable Cities",
    description:
      "Master the principles of eco-friendly urban development and green infrastructure",
    level: "Intermediate",
    modules: 6,
    duration: "4 hours",
  },
  {
    id: "advanced-tileville",
    title: "Advanced TileVille Strategies",
    description:
      "Take your TileVille gameplay to the next level with expert techniques and strategies",
    level: "Advanced",
    modules: 8,
    duration: "5 hours",
  },
  {
    id: "mina-ecosystem",
    title: "Exploring the Mina Ecosystem",
    description:
      "Dive deep into the Mina Protocol and understand how TileVille utilizes zk technology",
    level: "Intermediate",
    modules: 7,
    duration: "4.5 hours",
  },
  {
    id: "nft-mastery",
    title: "NFT Collection Mastery",
    description:
      "Learn how to build, manage, and maximize value from your digital collectibles",
    level: "Intermediate",
    modules: 5,
    duration: "3.5 hours",
  },
];

export default function AcademyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
          TileVille Academy
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-gray-300">
          Master the art and science of city building while learning about
          blockchain technology and game theory.
        </p>
      </div>

      <div className="relative mb-16 overflow-hidden rounded-xl bg-gray-800 p-8 text-white">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center md:flex-row">
          <div className="md:w-2/3 md:pr-8">
            <h2 className="mb-4 text-3xl font-bold text-primary">
              Featured Course
            </h2>
            <h3 className="mb-3 text-2xl font-semibold">
              Urban Planning in the Digital Age
            </h3>
            <p className="mb-6 text-gray-300">
              This comprehensive course bridges traditional urban planning
              principles with digital innovation. Learn how blockchain
              technology is transforming city development and how you can apply
              these concepts in TileVille and beyond.
            </p>
            <Link
              href="/academy/courses/urban-digital"
              className="hover:bg-primary-dark inline-flex items-center rounded-lg bg-primary px-6 py-3 font-bold text-white transition duration-300"
            >
              Enroll Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/3">
            <div className="relative h-60 w-full overflow-hidden rounded-xl shadow-lg"></div>
          </div>
        </div>
      </div>

      <h2 className="mb-8 text-3xl font-bold text-primary">Course Catalog</h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="overflow-hidden rounded-xl bg-gray-800 text-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
          >
            <div className="relative h-48">
              <div className="absolute right-0 top-0 m-3 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white">
                {course.level}
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
              <p className="mb-4 text-gray-300">{course.description}</p>
              <div className="mb-4 flex justify-between text-sm text-gray-400">
                <span>{course.modules} Modules</span>
                <span>{course.duration}</span>
              </div>
              <Link
                href={`/academy/courses/${course.id}`}
                className="block w-full rounded-lg bg-gray-700 py-2 text-center font-semibold text-white transition duration-300 hover:bg-gray-600"
              >
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-primary bg-primary bg-opacity-20 p-8">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Become a TileVille Master
        </h2>
        <p className="mb-6">
          Complete all courses to earn the exclusive TileVille Master
          certification NFT. This digital credential proves your expertise and
          unlocks special privileges in the TileVille ecosystem.
        </p>
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <h3 className="mb-2 text-xl font-semibold">Benefits include:</h3>
            <ul className="list-inside list-disc">
              <li>Early access to new features and competitions</li>
              <li>Special builder perks in gameplay</li>
              <li>Access to exclusive Master-only events</li>
              <li>Recognition in the TileVille community</li>
            </ul>
          </div>
          <div className="relative h-32 w-32"></div>
        </div>
      </div>
    </div>
  );
}
