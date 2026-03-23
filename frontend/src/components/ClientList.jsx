export default function ClientList({
  clients,
  selectedClientId,
  onSelectClient,
}) {
  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-lg font-bold text-dark-50 mb-4">Clients</h2>
        <div className="space-y-2">
          {clients.map((client) => (
            <button
              key={client.id}
              onClick={() => onSelectClient(client.id)}
              className={`w-full text-left px-4 py-3 rounded-md transition text-sm ${
                selectedClientId === client.id
                  ? "bg-dark-700 text-dark-50 border border-sage-200"
                  : "bg-dark-700 text-sage-300 hover:bg-dark-600 border border-sage-700"
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
