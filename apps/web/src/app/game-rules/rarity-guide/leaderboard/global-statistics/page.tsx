export const GlobalStatistics = () => {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Global Statistics</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="rounded-lg bg-white p-4 text-center shadow-sm">
          <div className="mb-1 text-gray-600">Total Players</div>
          <div className="text-2xl font-bold">5,842</div>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow-sm">
          <div className="mb-1 text-gray-600">Games Played</div>
          <div className="text-2xl font-bold">42,187</div>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow-sm">
          <div className="mb-1 text-gray-600">Avg. Score</div>
          <div className="text-2xl font-bold">8,432</div>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow-sm">
          <div className="mb-1 text-gray-600">Total Rewards</div>
          <div className="text-2xl font-bold">4,250 MINA</div>
        </div>
      </div>
    </section>
  );
};
