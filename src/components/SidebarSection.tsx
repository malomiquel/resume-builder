import useSection from "@/hooks/useSection"
import SidebarItem from "./SidebarItem"
import { FC } from "react"

const SidebarSection: FC = () => {
  const { sidebarSections } = useSection()

  return (
    <div className="flex flex-col p-4 gap-4">
      <h2 className="text-slate-600">
        Sidebar
      </h2>
      {sidebarSections.map((section) => (
        <SidebarItem key={section.id} section={section} />
      ))}
    </div>
  )
}

export default SidebarSection