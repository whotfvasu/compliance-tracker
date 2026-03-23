export default function StatsOverview({ tasks }) {
  const stats = [
    {
      label: "Total Tasks",
      value: tasks.length,
      color: "border-slate-300",
    },
    {
      label: "Pending",
      value: tasks.filter((t) => t.status === "Pending").length,
      color: "border-yellow-300",
    },
    {
      label: "In Progress",
      value: tasks.filter((t) => t.status === "In Progress").length,
      color: "border-blue-300",
    },
    {
      label: "Completed",
      value: tasks.filter((t) => t.status === "Completed").length,
      color: "border-green-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className={`card border-l-4 ${stat.color}`}>
          <div className="card-header">{stat.label}</div>
          <div className="stat-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
