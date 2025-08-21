import { useEffect, useState } from "react";
import React from "react";

interface NoteProps {
  text: string;
  date: string;
  handleSaveNote: (newText: string) => void;
}

const Note: React.FC<NoteProps> = ({ text, date, handleSaveNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(text);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
  };

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      handleSaveNote(noteText);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    setNoteText(text);
  }, [text]);

  return (
    <div className="bg-yellow-300 rounded-lg p-4 min-h-[170px] flex flex-col justify-between whitespace-pre-wrap">
      {!isEditing ? (
        <>
          <p>{noteText}</p>
          <div className="flex items-center justify-between mt-2">
            <small className="text-gray-700">Updated: {date}</small>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-200 rounded px-3 py-1 hover:bg-gray-300 transition-colors"
            >
              Edit
            </button>
          </div>
        </>
      ) : (
        <>
          <textarea
            rows={8}
            value={noteText}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 resize-none focus:outline-none"
          />
          <div className="flex items-center justify-end mt-2">
            <button
              onClick={handleSaveClick}
              className="bg-gray-200 rounded px-3 py-1 hover:bg-gray-300 transition-colors"
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
