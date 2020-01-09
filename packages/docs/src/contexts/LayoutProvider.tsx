import React, { useState, useEffect, useContext } from "react"

import RouterContext from "./RouterContext"
import LayoutContext from "./LayoutContext"

const LayoutProvider: React.FC = ({ children }) => {
  const [isMobileSidebarVisible, setMobileSidebarVisible] = useState(false)

  const { pathname } = useContext(RouterContext)

  useEffect(() => {
    setMobileSidebarVisible(false)
  }, [pathname])

  return (
    <LayoutContext.Provider
      value={{ isMobileSidebarVisible, setMobileSidebarVisible }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutProvider
