import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import ResumeBuilder from "./components/ResumeBuilder";
import DragOverlayWrapper from "./components/DragOverlayWrapper";
import { FC } from "react";
import SectionContextProvider from "./context/SectionContext";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const App: FC = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="p-4 bg-slate-800 text-white border-b-2 border-white">
        <h1 className="text-4xl font-bold text-center">CV Builder</h1>
      </div>
      <SectionContextProvider>
        <DndContext
          sensors={sensors}
        >
          <ResumeBuilder />
          <DragOverlayWrapper />
        </DndContext>
      </SectionContextProvider>
    </div>
  );
}

export default App;