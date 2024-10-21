import { useEffect, useState } from "react";
import Card from "../components/Card";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

export default function TodoBox() {
  const [tasks, setTasks] = useState<
    { id: number; title: string; done: boolean }[]
  >([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newId =
        tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      setTasks((prev) => [
        ...prev,
        { id: newId, title: newTask.trim(), done: false },
      ]);
      setNewTask("");
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <div className="w-full h-full row-span-5 col-span-2">
      <Card title=".tasks">
        <div className="flex flex-col h-full">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-grow overflow-auto p-1"
                >
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`px-2 py-0.5 flex content-center items-center space-x-2 hover:bg-white hover:text-black cursor-pointer`}
                          onClick={() => {
                            setTasks((prev) =>
                              prev.map((t) =>
                                t.id === task.id ? { ...t, done: !t.done } : t
                              )
                            );
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            handleDelete(task.id);
                          }}
                        >
                          <input type="checkbox" checked={task.done} readOnly />
                          <span>
                            {task.title.split(/([\w]+:)/i).map((part, index) =>
                              part.match(/^[\w]+:/i) ? (
                                <span
                                  key={index}
                                  className="bg-white text-black"
                                >
                                  {part}
                                </span>
                              ) : (
                                <span key={index}>{part}</span>
                              )
                            )}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <form onSubmit={handleAddTask} className="bg-black">
            <input
              id="newTaskInput"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="one more thing..."
              className="w-full px-2 py-1 bg-transparent border border-white focus:outline-none text-sm"
            />
          </form>
        </div>
      </Card>
    </div>
  );
}
