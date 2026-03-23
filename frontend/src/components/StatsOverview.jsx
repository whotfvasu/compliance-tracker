export default function StatsOverview({ tasks }) {
  const stats = [
    {
      label: "Total Tasks",
      value: tasks.length,
      color: "border-sage-700",
    },
    {
      label: "Pending",
      value: tasks.filter((t) => t.status === "Pending").length,
      color: "border-sage-700",
    },
    {
      label: "In Progress",
      value: tasks.filter((t) => t.status === "In Progress").length,
      color: "border-sage-700",
    },
    {
      label: "Completed",
      value: tasks.filter((t) => t.status === "Completed").length,
      color: "border-sage-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className={`card ${stat.color}`}>
          <div className="card-header">{stat.label}</div>
          <div className="stat-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
