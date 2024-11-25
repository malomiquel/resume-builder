import { Section } from '@/types/section'
import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import { FC } from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { initialSections } from '@/data/initial'

interface SidebarItemProps {
  section: Section
}

const SidebarItem: FC<SidebarItemProps> = ({ section }) => {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: section.id,
    data: {
      isSidebarItem: true,
    },
  })

  return (
    <Button
      ref={setNodeRef}
      variant={'outline'}
      className={cn(
        'flex flex-col h-[80px] w-[200px] gap-2 cursor-grab',
        isDragging && 'ring-2 ring-primary'
      )}
      {...attributes}
      {...listeners}
    >
      <h3>
        {section.title}
      </h3>
      <p>
        {section.content}
      </p>
    </Button>
  )
}

interface SidebarItemDragOverlayProps {
  id: UniqueIdentifier | undefined
}


export const SidebarItemDragOverlay: FC<SidebarItemDragOverlayProps> = ({ id }) => {
  const section = initialSections.find((section) => section.id === id)!

  return (
    <Button
      variant={'outline'}
      className={'flex flex-col h-[80px] w-[200px] gap-2 cursor-grab'}
    >
      <h3>
        {section.title}
      </h3>
      <p>
        {section.content}
      </p>
    </Button>
  )
}

export default SidebarItem