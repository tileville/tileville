import Link from "next/link";

export default function GameRules() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-primary">
        TileVille Game Rules
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="mb-3 text-2xl font-semibold">Basic Gameplay</h2>
          <p>
            TileVille is a city building arcade game where you strategically
            place different tiles to create a thriving metropolis.
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              Each game starts with an empty grid representing undeveloped land
            </li>
            <li>
              Players place tiles representing different buildings and
              infrastructure
            </li>
            <li>
              The goal is to create a balanced, sustainable city with maximal
              points
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">Tile Types</h2>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <span className="font-medium">Residential Tiles:</span> Houses and
              apartments that provide population
            </li>
            <li>
              <span className="font-medium">Commercial Tiles:</span> Shops and
              businesses that generate revenue
            </li>
            <li>
              <span className="font-medium">Industrial Tiles:</span> Factories
              and warehouses that provide jobs
            </li>
            <li>
              <span className="font-medium">Infrastructure Tiles:</span> Roads,
              power plants, and utilities
            </li>
            <li>
              <span className="font-medium">Green Tiles:</span> Parks, forests,
              and recreational areas
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">Scoring System</h2>
          <p>Your city is scored based on several factors:</p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              Population happiness (affected by green spaces and services)
            </li>
            <li>
              Economic prosperity (affected by commercial and industrial
              balance)
            </li>
            <li>Sustainability (affected by pollution and green spaces)</li>
            <li>Infrastructure efficiency (affected by road connectivity)</li>
            <li>Special achievements (unique city layouts or milestones)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">Special Rules</h2>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <span className="font-medium">Adjacent Bonuses:</span> Certain
              tiles benefit from being placed next to each other
            </li>
            <li>
              <span className="font-medium">Natural Features:</span> Rivers,
              mountains, and coastlines affect nearby tiles
            </li>
            <li>
              <span className="font-medium">Development Stages:</span> Cities
              evolve through different eras as they grow
            </li>
            <li>
              <span className="font-medium">Disasters:</span> Random events may
              challenge your city management
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">Competition Mode</h2>
          <p>
            In competition mode, players compete to build the best city within
            specific constraints:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>Limited time (speed challenges)</li>
            <li>Limited resources or tiles</li>
            <li>
              Special requirements (sustainability focus, tourism focus, etc.)
            </li>
            <li>
              Special map conditions (islands, mountains, extreme weather)
            </li>
          </ul>
        </section>

        <div className="mt-8 flex justify-center">
          <Link
            href="/competitions"
            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/80"
          >
            Join a Competition
          </Link>
        </div>
      </div>
    </div>
  );
}
