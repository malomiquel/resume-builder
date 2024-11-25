import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";

import { Section } from "@/types/section";
import { initialSections } from "@/data/initial";

interface SectionContextType {
  sidebarSections: Section[];
  setSidebarSections: Dispatch<SetStateAction<Section[]>>;

  previewSections: Section[];
  setPreviewSections: Dispatch<SetStateAction<Section[]>>;
  updatePreviewSection: (section: Section) => void;
};

export const SectionContext = createContext<SectionContextType | null>(null);

interface SectionContextProviderProps {
  children: ReactNode;
}

const SectionContextProvider: FC<SectionContextProviderProps> = ({ children }) => {
  const [sidebarSections, setSidebarSections] = useState<Section[]>(initialSections);
  const [previewSections, setPreviewSections] = useState<Section[]>([]);

  const updatePreviewSection = (section: Section) => {
    const sectionIndex = previewSections.findIndex((s) => s.id === section.id);
    const newPreviewSections = [...previewSections];
    newPreviewSections[sectionIndex] = section;
    setPreviewSections(newPreviewSections);
  };

  return (
    <SectionContext.Provider
      value={{
        sidebarSections,
        setSidebarSections,
        previewSections,
        setPreviewSections,
        updatePreviewSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
}

export default SectionContextProvider;