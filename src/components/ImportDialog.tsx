import React, { useState, useEffect } from "react";

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (lyrics: string, tasks: string) => void;
}

const ImportDialog: React.FC<ImportDialogProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [lyrics, setLyrics] = useState("");
  const [tasks, setTasks] = useState("");

  useEffect(() => {
    if (isOpen) {
      setLyrics(localStorage.getItem("lyrics") || "");
      setTasks(localStorage.getItem("tasks") || "");
    }
  }, [isOpen]);

  const handleImport = () => {
    onImport(lyrics, tasks);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-p p-6  w-3/4 max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Import Data</h2>
        <div className="mb-4">
          <label htmlFor="lyrics" className="block mb-2">
            Lyrics JSON:
          </label>
          <textarea
            id="lyrics"
            className="w-full h-32 p-2 focus:outline-none"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tasks" className="block mb-2">
            Tasks JSON:
          </label>
          <textarea
            id="tasks"
            className="w-full h-32 p-2 focus:outline-none"
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 mr-2"
            onClick={handleImport}
          >
            Import
          </button>
          <button className="bg-gray-300 px-4 py-2" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportDialog;
