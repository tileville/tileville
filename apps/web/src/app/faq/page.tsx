import { Text } from "@radix-ui/themes";
import { faqContent } from "./faq-content";

export default function FAQPage() {
  return (
    <div className="mt-8">
      <div className="mx-auto max-w-7xl divide-y divide-primary/50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {faqContent.map(({ id, title, faqs }) => (
          <div className="mt-4" key={id}>
            <h2 className="my-8 block text-3xl font-bold tracking-tight">
              {title}
            </h2>
            <div className="mb-2 mt-8">
              <dl className="divide-y divide-primary/30">
                {faqs.map(({ question, answer, id }) => (
                  <div
                    className="pb-8 pt-6 md:grid md:grid-cols-12 md:gap-8"
                    key={id}
                  >
                    <Text
                      className="text-base font-semibold md:col-span-5"
                      color="grass"
                    >
                      {question}
                    </Text>
                    <dd className="mt-2 md:col-span-7 md:mt-0">
                      <Text className="text-base">{answer}</Text>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
