import React, { useState } from "react";
import type { Client } from "../../types/types";
import { nanoid } from "nanoid";

interface AddClientModalProps {
  onClose: () => void;
  onAddClient: (client: Client) => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ onClose, onAddClient }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [phone, setPhone] = useState("");
  const [issue, setIssue] = useState("");

  const handleAdd = () => {
    if (!name || !age || !phone || !issue) return;

    const newClient: Client = {
      id: nanoid(),
      name,
      age: Number(age),
      phone,
      issue,
      notes: [],
    };

    onAddClient(newClient);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-xl shadow-xl max-w-md w-11/12">
        <button
          className="absolute top-2 right-2 text-2xl hover:text-red-500"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4">Add New Client</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={age}
            onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
          />
          <input
            type="text"
            placeholder="Phone"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Issue"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleAdd}
          >
            Add Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;
