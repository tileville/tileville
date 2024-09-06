"use client";

import { HomeIcon } from "@radix-ui/react-icons";
import { Trait, traitsContent } from "./trait-content";
import { useState, useEffect, useRef } from "react";

export default function TraitsInfo() {
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      let currentSection = "";

      Object.entries(sectionRefs.current).forEach(([id, ref]) => {
        if (
          ref &&
          ref.offsetTop <= scrollPosition &&
          ref.offsetTop + ref.offsetHeight > scrollPosition
        ) {
          currentSection = id;
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial active section
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const yOffset = -250; // Adjust this value to fine-tune the scroll position
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-primary/10 px-2 pb-12 pt-8 md:px-4 md:pb-28 md:pt-20">
      <div className="fade-slide-in mx-auto max-w-[1280px]">
        <div className="sticky top-0 z-10 bg-primary/90 p-3 shadow-md md:top-[52px] md:p-5">
          <div className="mb-4 md:mb-8">
            <div className="text-md mb-1 flex items-center gap-2 text-white md:text-2xl">
              <h1 className="font-bold">
                Welcome to the world of TileVille Builder NFTs!
              </h1>
              <HomeIcon width={24} height={24} />
            </div>
            <p className="mt-2 text-sm text-primary-foreground md:text-base">
              Each Builder possesses a unique combination of traits that define
              their strengths and specialties in city development. These traits
              not only make each Builder special but also have the potential to
              influence gameplay mechanics in future updates. Let&apos;s explore
              each trait and its significance:
            </p>
          </div>

          <nav className="overflow-x-auto">
            <ul className="flex items-center gap-2 md:gap-4">
              {traitsContent.map((trait) => {
                const sectionId = trait.title.replace(/\s+/g, "-");
                return (
                  <li key={trait.title}>
                    <button
                      onClick={() => scrollToSection(sectionId)}
                      className={`whitespace-nowrap rounded-md border border-primary-foreground px-2 py-1 text-xs font-medium transition-colors md:px-4 md:py-2 md:text-sm ${
                        activeSection === sectionId
                          ? "bg-primary-foreground text-primary"
                          : "text-primary-foreground hover:bg-primary/30"
                      }`}
                    >
                      {trait.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col pt-4 text-xs md:pt-8 md:text-base">
          {traitsContent.map((trait: Trait) => {
            const sectionId = trait.title.replace(/\s+/g, "-");
            return (
              <section
                key={trait.title}
                id={sectionId}
                ref={(el) => (sectionRefs.current[sectionId] = el)}
                className="scroll-mt-40"
              >
                <div className="py-2 md:py-4">
                  <div className="rounded-sm px-1 py-4 shadow-md md:rounded-lg md:bg-primary/20 md:p-6 md:px-4">
                    <h2 className="text-base font-bold text-primary md:mb-1 md:text-2xl">
                      {trait.title}
                    </h2>
                    <p className="mb-3 text-black/90 md:mb-6">
                      {trait.description}
                    </p>

                    {trait.items && (
                      <div className="space-y-2 ps-1 md:ps-4">
                        {trait.items.map((item) => (
                          <div
                            className="backdrop-blur transition-all hover:translate-x-2 md:p-2 md:shadow-[#11111a0d_0px_1px_0px,_#11111a1a_0px_0px_8px]"
                            key={item.name}
                          >
                            <h3 className="text-base font-semibold text-primary">
                              {item.name}
                            </h3>
                            <p className="text-xs text-black/90 md:text-sm">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
