import { Active, useDndMonitor, useDroppable } from "@dnd-kit/core"
import SidebarSection from "./SidebarSection"
import { FC, useState } from "react"
import PreviewItem from "./PreviewItem"
import useSection from "@/hooks/useSection"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

const ResumeBuilder: FC = () => {
  const { sidebarSections, setSidebarSections, previewSections, setPreviewSections } = useSection()
  const [active, setActive] = useState<Active | null>(null)
  const isActiveSidebarItem = active?.data.current?.isSidebarItem

  const { setNodeRef, isOver } = useDroppable({
    id: "resume-builder",
  })

  useDndMonitor({
    onDragStart({ active }) {
      setActive(active)
    },
    onDragCancel() {
      setActive(null)
    },
    onDragEnd({ active, over }) {
      setActive(null)

      if (!over) {
        return
      }

      const isSidebarItem = active.data.current?.isSidebarItem
      const isPreviewItem = active.data.current?.isPreviewItem

      if (isSidebarItem) {
        setSidebarSections((prevSections) => {
          return prevSections.filter((section) => section.id !== active.id)
        })

        setPreviewSections((prevSections) => {
          const section = sidebarSections.find((section) => section.id === active.id)
          return [...prevSections, section!]
        })
      }

      if (isPreviewItem) {
        if (over && active.id !== over.id) {
          setPreviewSections((prevSections) => {
            const oldIndex = prevSections.findIndex((section) => section.id === active.id)
            const newIndex = prevSections.findIndex((section) => section.id === over.id)

            return arrayMove(prevSections, oldIndex, newIndex)
          })
        }
      }
    },
  })

  return (
    <div className="flex w-full h-full">
      <SidebarSection />
      <div className="flex justify-center w-full">
        <div
          ref={setNodeRef}
          className="flex flex-col bg-gray-200 w-3/4 m-4 rounded-md"
        >
          {previewSections.length > 0 && (
            <div className="flex flex-col p-4 gap-4 w-full">
              <SortableContext
                items={previewSections}
                strategy={verticalListSortingStrategy}
              >
                {previewSections.map((section) => (
                  <PreviewItem
                    key={section.id}
                    section={section}
                  />
                ))}
              </SortableContext>
            </div>
          )}

          {isOver && isActiveSidebarItem && (
            <div className="p-4 w-full">
              <div className="bg-gray-300 h-[100px] rounded-md" />
            </div>
          )}

          {!isOver && previewSections.length === 0 && (
            <div className="flex flex-grow justify-center items-center">
              <p>
                Glisser et déposer des sections ici
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder