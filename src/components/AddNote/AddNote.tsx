import { useState } from "react";

interface AddNoteProps {
  handleAddNote: (text: string) => void;
}

const AddNote: React.FC<AddNoteProps> = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
  };

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText("");
    }
  };

  return (
    <div className="bg-teal-400 p-4 rounded-lg flex flex-col gap-2">
      <textarea
        rows={8}
        cols={10}
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleChange}
        className="resize-none p-2 rounded-md border border-gray-300 focus:outline-none"
      />
      <div className="flex justify-between">
        <button
          onClick={handleSaveClick}
          className="bg-gray-200 rounded-full px-4 py-1 hover:bg-gray-300 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
