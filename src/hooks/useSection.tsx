import { SectionContext } from "@/context/SectionContext"
import { useContext } from "react"

const useSection = () => {
  const context = useContext(SectionContext)

  if (!context) {
    throw new Error('useSection must be used within a SectionContextProvider')
  }

  return context
}

export default useSection