export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-500">
          Wed love to hear from you. Reach out with questions, feedback, or
          partnership inquiries.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-primary">Get in Touch</h2>
          <p className="mt-2 text-gray-600">
            Have questions about TileVille? Our team is here to help. Choose the
            most convenient way to reach us.
          </p>

          <div className="mt-8 space-y-6">
            {CONTACT_METHODS.map((method) => (
              <div key={method.title} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {method.icon}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">{method.title}</h3>
                  <p className="mt-1 text-gray-600">{method.description}</p>
                  <a
                    href={method.link}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className="mt-2 block text-sm font-medium text-primary hover:underline"
                  >
                    {method.linkText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-primary">Quick Contact Form</h2>
          <p className="mt-2 text-gray-600">
            Fill out this form and well get back to you as soon as possible.
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              >
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Partnership Opportunity</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-12 rounded-lg bg-primary/10 p-6 text-center">
        <h2 className="text-lg font-bold text-primary">
          Need immediate assistance?
        </h2>
        <p className="mt-2 text-gray-600">
          Join our Telegram community for real-time support and discussions with
          other players.
        </p>
        <a
          href="https://t.me/tilevilleBugs"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-md bg-primary px-5 py-2 text-white hover:bg-primary/90"
        >
          Join Telegram
        </a>
      </div>
    </div>
  );
}

const CONTACT_METHODS = [
  {
    title: "Community Support",
    description:
      "Join our Telegram group for real-time community support and discussions.",
    icon: "💬",
    link: "https://t.me/tilevilleBugs",
    linkText: "Join Telegram Community",
    external: true,
  },
  {
    title: "Technical Support",
    description: "Having technical issues? Our support team is ready to help.",
    icon: "🛠️",
    link: "mailto:support@tileville.xyz",
    linkText: "support@tileville.xyz",
    external: true,
  },
  {
    title: "Report a Bug",
    description: "Found a bug? Let us know so we can fix it.",
    icon: "🐞",
    link: "https://t.me/tilevilleBugs/277",
    linkText: "Report Bug",
    external: true,
  },
];
