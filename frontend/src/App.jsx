import { useState, useEffect } from "react";
import { api } from "./services/api.js";
import Navbar from "./components/Navbar.jsx";
import ClientList from "./components/ClientList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import StatsOverview from "./components/StatsOverview.jsx";

export default function App() {
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (selectedClientId) {
      fetchTasks();
    }
  }, [selectedClientId]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await api.getClients();
      setClients(data);
      if (data.length > 0) {
        setSelectedClientId(data[0].id);
      }
    } catch (err) {
      setError("Failed to load clients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const data = await api.getClientTasks(selectedClientId);
      setTasks(data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };

  const handleTaskCreated = () => {
    fetchTasks();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-dark-200 text-sm">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-risk-500 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8 pt-28">
        {selectedClientId && (
          <>
            <StatsOverview tasks={tasks} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

              <div className="lg:col-span-1">
                <ClientList
                  clients={clients}
                  selectedClientId={selectedClientId}
                  onSelectClient={setSelectedClientId}
                />
              </div>

              <div className="lg:col-span-3 space-y-6">
                <TaskForm
                  clientId={selectedClientId}
                  onTaskCreated={handleTaskCreated}
                />
                <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
