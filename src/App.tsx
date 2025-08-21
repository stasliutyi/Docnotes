import { useState } from "react";
import { nanoid } from "nanoid";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import type { Client } from "./types/types";
import ClientModal from "./components/ClientModal/ClientModal";
import AddClientModal from "./components/AddClientModal/AddClientModal";

const App: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem("clients");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [addClientModalOpen, setAddClientModalOpen] = useState(false);

  const saveClientsToStorage = (updatedClients: Client[]) => {
    localStorage.setItem("clients", JSON.stringify(updatedClients));
    setClients(updatedClients);
  };

  const saveNote = (clientId: string, text: string) => {
    const updatedClients = clients.map((c) =>
      c.id === clientId
        ? { ...c, notes: [{ id: nanoid(), text, date: new Date().toLocaleDateString() }] }
        : c
    );
    saveClientsToStorage(updatedClients);
    const updatedClient = updatedClients.find((c) => c.id === clientId) || null;
    setSelectedClient(updatedClient);
  };

  const addClient = (client: Client) => {
    saveClientsToStorage([...clients, client]);
  };

  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      <div className="max-w-5xl mx-auto px-4">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />

        <button
          className="bg-gray-200 rounded-full px-4 py-2 mt-4 hover:bg-gray-300"
          onClick={() => setAddClientModalOpen(true)}
        >
          Add New Client
        </button>

        {addClientModalOpen && (
          <AddClientModal
            onClose={() => setAddClientModalOpen(false)}
            onAddClient={addClient}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {clients
            .filter((c) =>
              c.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((client) => (
              <div
                key={client.id}
                className="bg-gray-100 rounded-xl p-4 shadow cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedClient(client)}
              >
                <h2 className="text-xl font-semibold">{client.name}</h2>
                <p><strong>Age:</strong> {client.age}</p>
                <p><strong>Phone:</strong> {client.phone}</p>
                <p><strong>Issue:</strong> {client.issue}</p>
              </div>
            ))}
        </div>

        {selectedClient && (
          <ClientModal
            client={selectedClient}
            onClose={() => setSelectedClient(null)}
            handleSaveNote={saveNote}
          />
        )}
      </div>
    </div>
  );
};

export default App;
