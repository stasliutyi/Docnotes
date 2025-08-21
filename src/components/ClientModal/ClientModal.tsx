import Note from "../Note/Note";
import type { Client } from "../../types/types";
import Recorder from "../Recorder/Recorder";
import { useState } from "react";

interface ClientModalProps {
  client: Client;
  onClose: () => void;
  handleSaveNote: (clientId: string, text: string) => void;
}

const ClientModal: React.FC<ClientModalProps> = ({
  client,
  onClose,
  handleSaveNote,
}) => {
  const isClient = typeof window !== "undefined";

  const [newNote, setNewNote] = useState<string>(
    client.notes?.[0]?.text || "Немає нотатки"
  );

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg z-50 w-96 max-w-[90%] flex flex-col gap-4">
        <button
          onClick={onClose}
          className="self-end text-gray-600 hover:text-gray-800 font-bold"
        >
          Close
        </button>

        <h2 className="text-xl font-semibold">{client.name}</h2>
        <p>
          <strong>Age:</strong> {client.age}
        </p>
        <p>
          <strong>Phone:</strong> {client.phone}
        </p>
        <p>
          <strong>Issue:</strong> {client.issue}
        </p>

        <h3 className="mt-4 text-lg font-medium">Note:</h3>

        {isClient && (
          <Recorder
            onTranscribed={(text) => {
              const base = client.notes[0]?.text || "";
              const merged = base ? `${base}\n\n${text}` : text;
              setNewNote(newNote + "\n\n" + text);
              handleSaveNote(client.id, merged);
            }}
          />
        )}

        <Note
          text={newNote}
          date={client.notes[0]?.date || new Date().toLocaleDateString()}
          handleSaveNote={(newText) => handleSaveNote(client.id, newText)}
        />
      </div>
    </>
  );
};

export default ClientModal;
