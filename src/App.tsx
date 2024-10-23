import { useEffect } from "react";
import TimeBox from "./cards/TimeBox";
import TodoBox from "./cards/TodoBox";
import LyricBox from "./cards/LyricBox";

function App() {
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
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

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
    </div>
  );
}

export default App;
