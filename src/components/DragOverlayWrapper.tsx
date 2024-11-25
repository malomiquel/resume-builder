import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { useState } from "react"
import { SidebarItemDragOverlay } from "./SidebarItem"

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

  useDndMonitor({
    onDragStart(event) {
      setDraggedItem(event.active)
    },
    onDragCancel() {
      setDraggedItem(null)
    },
    onDragEnd() {
      setDraggedItem(null)
    },
  })

  let node = null


  if (draggedItem?.data.current?.isSidebarItem) {
    node = <SidebarItemDragOverlay id={draggedItem?.id} />
  }

  return (
    <DragOverlay>
      {node}
    </DragOverlay>
  )
}

export default DragOverlayWrapper