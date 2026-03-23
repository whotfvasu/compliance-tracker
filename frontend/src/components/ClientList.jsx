export default function ClientList({
  clients,
  selectedClientId,
  onSelectClient,
}) {
  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-lg font-bold text-grey-100 mb-4">Clients</h2>
        <div className="space-y-2">
          {clients.map((client) => (
            <button
              key={client.id}
              onClick={() => onSelectClient(client.id)}
              className={`w-full text-left px-4 py-3 rounded-md transition text-sm ${
                selectedClientId === client.id
                  ? "bg-grey-800 text-grey-100"
                  : "bg-grey-950 text-grey-300 hover:bg-grey-900 border border-grey-800"
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
