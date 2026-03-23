import { useState } from "react";
import {
  isOverdue,
  formatDate,
  getStatusColor,
  getPriorityColor,
} from "../utils/helpers.js";

export default function TaskList({ tasks, onTaskUpdated }) {
  const [filters, setFilters] = useState({ status: "", category: "" });

  const filteredTasks = tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.category && task.category !== filters.category) return false;
    return true;
  });

  const categories = [...new Set(tasks.map((t) => t.category))];

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const { api } = await import("../services/api.js");
      await api.updateTask(taskId, { status: newStatus });
      onTaskUpdated();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-dark-50 mb-4">Tasks</h3>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-3 py-2 border border-sage-700 rounded-md text-xs focus:ring-2 focus:ring-sage-600 bg-dark-700 text-dark-50"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-3 py-2 border border-sage-700 rounded-md text-xs focus:ring-2 focus:ring-sage-600 bg-dark-700 text-dark-50"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-sage-500 text-center py-8 text-sm">
            No tasks found
          </p>
        ) : (
          filteredTasks.map((task) => {
            const overdue = isOverdue(task.dueDate, task.status);
            return (
              <div
                key={task.id}
                className={`p-4 border rounded-md text-sm ${
                  overdue
                    ? "bg-dark-700 border-risk-700"
                    : "bg-dark-700 border-sage-700"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4
                      className={`font-semibold ${
                        overdue ? "text-risk-400" : "text-dark-50"
                      }`}
                    >
                      {task.title}
                      {overdue && (
                        <span className="ml-2 text-risk-500 text-xs">
                          ⚠ OVERDUE
                        </span>
                      )}
                    </h4>
                    {task.description && (
                      <p className="text-xs text-sage-400 mt-2">
                        {task.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`badge ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <span className="badge bg-sage-800 text-sage-100">
                        {task.category}
                      </span>
                      <span
                        className={`badge font-bold ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                      <span className="badge bg-sage-800 text-sage-100">
                        {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </div>

                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                    className="px-2 py-1 border border-sage-700 rounded text-xs focus:ring-2 focus:ring-sage-600 bg-dark-700 text-dark-50 whitespace-nowrap"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
