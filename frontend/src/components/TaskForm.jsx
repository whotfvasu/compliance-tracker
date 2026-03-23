import { useState } from "react";

export default function TaskForm({ clientId, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Compliance",
    dueDate: "",
    priority: "Medium",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { api } = await import("../services/api.js");
      await api.createTask({
        ...formData,
        clientId: parseInt(clientId),
      });
      setFormData({
        title: "",
        description: "",
        category: "Compliance",
        dueDate: "",
        priority: "Medium",
      });
      onTaskCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Add Task</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-xs border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          rows="2"
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white resize-none"
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option>Compliance</option>
            <option>Tax</option>
            <option>Audit</option>
            <option>License</option>
            <option>Reporting</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition text-sm font-semibold"
        >
          {loading ? "Creating..." : "Add Task"}
        </button>
      </div>
    </form>
  );
}
