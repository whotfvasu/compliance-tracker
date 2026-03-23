const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const api = {
  // clients
  async getClients() {
    const res = await fetch(`${API_URL}/clients`);
    if (!res.ok) throw new Error("Failed to fetch clients");
    return res.json();
  },

  async getClient(clientId) {
    const res = await fetch(`${API_URL}/clients/${clientId}`);
    if (!res.ok) throw new Error("Failed to fetch client");
    return res.json();
  },

  // tasks
  async getTasks(filters = {}) {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_URL}/tasks?${params}`);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },

  async getClientTasks(clientId) {
    const res = await fetch(`${API_URL}/clients/${clientId}/tasks`);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },

  async createTask(taskData) {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
  },

  async updateTask(taskId, updates) {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  },

  async deleteTask(taskId) {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
    return res.json();
  },
};
