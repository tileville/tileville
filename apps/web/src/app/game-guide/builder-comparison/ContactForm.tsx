import React from "react";

export default function ContactForm() {
  return (
    <form className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="How can we help you?"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-primary/90"
      >
        Send Message
      </button>
    </form>
  );
}
