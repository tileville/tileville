export const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="mb-4 text-2xl font-bold">Quick Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded bg-white p-3 shadow">
          <h2 className="text-lg font-semibold">Total Visitors</h2>
          <p className="text-3xl text-blue-600">1,234</p>
        </div>
        <div className="rounded bg-white p-3 shadow">
          <h2 className="text-lg font-semibold">Active Users</h2>
          <p className="text-3xl text-green-600">456</p>
        </div>
      </div>
    </div>
  );
};
