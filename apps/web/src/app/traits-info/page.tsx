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
    <div className="bg-primary/10 px-4 pb-28 pt-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="sticky top-[52px] z-10 bg-primary/90 p-5 shadow-md">
          <div className="mb-8">
            <div className="mb-1 flex items-center gap-2 text-2xl text-white">
              <h1 className="font-bold">
                Welcome to the world of TileVille Builder NFTs!
              </h1>
              <HomeIcon width={24} height={24} />
            </div>
            <p className="mt-2 text-primary-foreground">
              Each Builder possesses a unique combination of traits that define
              their strengths and specialties in city development. These traits
              not only make each Builder special but also have the potential to
              influence gameplay mechanics in future updates. Let&apos;s explore
              each trait and its significance:
            </p>
          </div>

          <nav className="overflow-x-auto">
            <ul className="flex items-center gap-4">
              {traitsContent.map((trait) => {
                const sectionId = trait.title.replace(/\s+/g, "-");
                return (
                  <li key={trait.title}>
                    <button
                      onClick={() => scrollToSection(sectionId)}
                      className={`rounded-md border border-primary-foreground px-4 py-2 text-sm font-medium transition-colors ${
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

        <div className="flex flex-col pt-8">
          {traitsContent.map((trait: Trait) => {
            const sectionId = trait.title.replace(/\s+/g, "-");
            return (
              <section
                key={trait.title}
                id={sectionId}
                ref={(el) => (sectionRefs.current[sectionId] = el)}
                className="scroll-mt-40"
              >
                <div className="py-4">
                  <div className="rounded-lg bg-primary/20 p-6 shadow-md">
                    <h2 className="mb-1 text-2xl font-bold text-primary">
                      {trait.title}
                    </h2>
                    <p className="mb-6 text-black/90">{trait.description}</p>

                    {trait.items && (
                      <div className="space-y-2 ps-4">
                        {trait.items.map((item) => (
                          <>
                            <div className="cursor-pointer p-2 shadow-[#11111a0d_0px_1px_0px,_#11111a1a_0px_0px_8px] backdrop-blur transition-all hover:translate-x-2">
                              <h3 className="text-base font-semibold text-primary">
                                {item.name}
                              </h3>
                              <p className="text-sm text-black/90">
                                {item.description}
                              </p>
                            </div>
                          </>
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
