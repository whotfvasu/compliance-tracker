export default function ClientList({
  clients,
  selectedClientId,
  onSelectClient,
}) {
  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Clients</h2>
        <div className="space-y-2">
          {clients.map((client) => (
            <button
              key={client.id}
              onClick={() => onSelectClient(client.id)}
              className={`w-full text-left px-4 py-3 rounded-md transition text-sm ${
                selectedClientId === client.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <div className="font-semibold">{client.name}</div>
              <div className="text-xs opacity-70 mt-1">
                {client.country} • {client.entityType}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
