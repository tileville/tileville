import Link from "next/link";


export default function Community() {
  return (
    <div className="md:p-8 p-4 mt-10 md:pt-20">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-4 md:mb-12 text-center  text-2xl md:text-4xl font-bold text-[#4a5240]">
          Community section
        </h1>

        <div className="rounded-lg border border-primary/30 p-4  md:p-8 shadow-lg transition-shadow hover:shadow-none">
          <h2 className="mb-4 text-lg md:text-2xl font-semibold text-[#4a5240]">Host Your Competition</h2>
          <p className="mb-6 text-[#4a5240]">If you want to host the competition please fill out the Form</p>

          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSdwNysGNvo5YRu88rQ1L36dT4swot4pXe1YedpHoKMdB50I8g/viewform"
            target="_blank"
            className="inline-block rounded-md bg-primary w-full md:w-auto text-center px-6 py-3 text-white transition-colors hover:bg-primary/80"
          >
            Form
          </Link>

        </div>
      </div>
    </div>
  );
}
