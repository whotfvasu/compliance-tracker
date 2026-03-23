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
    Pending: "bg-grey-800 text-grey-200",
    "In Progress": "bg-grey-800 text-grey-200",
    Completed: "bg-grey-800 text-grey-200",
  };
  return colors[status] || "bg-grey-800 text-grey-200";
};

export const getPriorityColor = (priority) => {
  const colors = {
    Low: "text-grey-400",
    Medium: "text-grey-300",
    High: "text-grey-200",
  };
  return colors[priority] || "text-grey-400";
};
