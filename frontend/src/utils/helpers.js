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
    Pending: "bg-sage-800 text-sage-100",
    "In Progress": "bg-sage-800 text-sage-100",
    Completed: "bg-sage-800 text-sage-100",
  };
  return colors[status] || "bg-sage-800 text-sage-100";
};

export const getPriorityColor = (priority) => {
  const colors = {
    Low: "text-sage-400",
    Medium: "text-sage-300",
    High: "text-risk-500",
  };
  return colors[priority] || "text-sage-400";
};
