import React, { useState, useEffect } from "react"
import { globalHistory } from "@reach/router"

import RouterContext from "./RouterContext"

const RouterProvider: React.FC = ({ children }) => {
  const [pathname, setPathname] = useState(globalHistory.location.pathname)

  useEffect(() => {
    const removeListener = globalHistory.listen(() =>
      setPathname(globalHistory.location.pathname)
    )

    return () => {
      removeListener()
    }
  }, [])

  return (
    <RouterContext.Provider value={{ pathname }}>
      {children}
    </RouterContext.Provider>
  )
}

export default RouterProvider
