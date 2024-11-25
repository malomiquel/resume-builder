import { FC, useEffect, useRef, useState } from "react"
import { Section } from "@/types/section"
import useSection from "@/hooks/useSection";
import { Textarea } from "./ui/textarea";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";

interface PreviewItemProps {
  section: Section;
}

const PreviewItem: FC<PreviewItemProps> = ({ section }) => {
  const { updatePreviewSection } = useSection()
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: section.id,
    data: {
      isPreviewItem: true,
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [isEditing]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedSection = { ...section, content: e.target.value };

    updatePreviewSection(updatedSection);

    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative p-4 rounded-sm bg-gray-300 text-black"
    >
      <h3>
        {section.title}
      </h3>
      <button
        className="mt-2 relative w-full"
        onClick={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
      >
        <Textarea
          ref={textareaRef}
          value={section.content}
          onChange={handleContentChange}
          className="w-full p-1 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded resize-none min-h-[100px]"
          placeholder="Ecrire quelque chose..."
        />
      </button>
      <GripVertical
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 cursor-grab" 
        />
    </div>
  )
}

export default PreviewItem