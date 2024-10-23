import { useEffect, useState } from "react";
import TimeBox from "./cards/TimeBox";
import TodoBox from "./cards/TodoBox";
import LyricBox from "./cards/LyricBox";
import ImportDialog from "./components/ImportDialog";

function App() {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        document.activeElement?.getAttribute("contenteditable") === "true"
      ) {
        return;
      }

      if (event.key === "t") {
        const newTaskInput = document.getElementById("newTaskInput");
        if (newTaskInput) {
          (newTaskInput as HTMLInputElement).focus();
          if ((newTaskInput as HTMLInputElement).value === "") {
            event.preventDefault();
          }
        }
      } else if (event.key === "i") {
        setIsImportDialogOpen(true);
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleImport = (lyrics: string, tasks: string) => {
    try {
      const parsedLyrics = JSON.parse(lyrics);
      const parsedTasks = JSON.parse(tasks);

      localStorage.setItem("lyrics", JSON.stringify(parsedLyrics));
      localStorage.setItem("tasks", JSON.stringify(parsedTasks));

      // You might want to update the state of your LyricBox and TodoBox components here
      // or trigger a re-render to fetch the new data from localStorage
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Error parsing JSON. Please check your input and try again.");
    }
  };

  return (
    <div className="w-screen h-screen grid grid-rows-2 grid-cols-2 p-2">
      <div className="grid grid-cols-6 grid-rows-8">
        <LyricBox />
      </div>
      <div className="w-full h-full grid grid-cols-5 grid-rows-8 row-span-2">
        <div></div>
        <div></div>
        <div></div>
        <TimeBox />
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className=" flex justify-center items-center col-span-2 border text-7xl select-none font-semibold">
          HUDv2
        </div>
        <div></div>
        <div></div>
        <div></div>
        <TodoBox />
      </div>
      <div></div>
      <ImportDialog
        isOpen={isImportDialogOpen}
        onClose={() => setIsImportDialogOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
}

export default App;
