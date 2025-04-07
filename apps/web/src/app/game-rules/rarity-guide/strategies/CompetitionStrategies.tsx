export const CompetitionStrategies = () => {
  return (
    <div className="mb-12 rounded-lg bg-primary/10 p-6">
      <h2 className="mb-4 text-2xl font-bold text-primary">
        Competition Strategies
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-xl font-semibold">Speed Challenges</h3>
          <p className="mb-3">
            Optimize your performance in time-limited contests:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>Pre-plan your building sequence before starting</li>
            <li>
              Focus on high-value buildings that provide quick score boosts
            </li>
            <li>
              Skip aesthetic elements that consume time but offer minimal points
            </li>
            <li>
              Practice rapid expansion techniques using keyboard shortcuts
            </li>
            <li>
              Prioritize population growth over aesthetics for maximum points
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-xl font-semibold">PVP Challenges</h3>
          <p className="mb-3">Strategies for defeating other players:</p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              Study your opponents previous cities to predict their strategy
            </li>
            <li>Focus on rapid early development to claim key resources</li>
            <li>
              Create specialized cities that excel in specific scoring
              categories
            </li>
            <li>Adapt to challenge conditions faster than your opponents</li>
            <li>
              Maintain a balanced approach unless you identify a weakness to
              exploit
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
