import { createContext } from "react"

interface ILayoutContext {
  isMobileSidebarVisible: boolean
  setMobileSidebarVisible: (value: boolean) => void
}

export const LayoutContext = createContext<ILayoutContext>({
  isMobileSidebarVisible: false,
  setMobileSidebarVisible: () => {},
})

export default LayoutContext
