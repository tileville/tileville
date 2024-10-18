import Image from "next/image"
import Link from "next/link"

export const CompetitionsHeader = () => {
  return (
    <div className="p-4 pb-2 pt-10 md:py-20">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl md:text-4xl">Competitions</h2>
          <div>
            <Image
              src="/image/cards/trophyGolden.png"
              width={70}
              height={86}
              alt="trophy"
              className="h-auto w-8 md:w-16"
            />
          </div>
        </div>
        <Link
          href="/competitions/demo-game"
          className="rounded-md border-2 border-primary bg-primary bg-opacity-30 px-2 py-2 text-center font-mono text-sm leading-none text-white hover:shadow-[0_0_8px_hsl(var(--primary))] md:px-[15px] md:text-base"
        >
          Play Demo Game
        </Link>
      </div>
    </div>
  )
}