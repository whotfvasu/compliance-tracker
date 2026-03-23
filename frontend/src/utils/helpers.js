export const isOverdue = (dueDate, status) => {
  if (status === "Completed") return false;
  return new Date(dueDate) < new Date();
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getStatusColor = (status) => {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

export const getPriorityColor = (priority) => {
  const colors = {
    Low: "text-gray-500",
    Medium: "text-orange-500",
    High: "text-red-500",
  };
  return colors[priority] || "text-gray-500";
};
