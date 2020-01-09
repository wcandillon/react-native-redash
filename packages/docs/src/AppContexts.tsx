import React from "react"

import { LayoutProvider, RouterProvider } from "src/contexts"

const AppContexts: React.FC = ({ children }) => (
  <RouterProvider>
    <LayoutProvider>{children}</LayoutProvider>
  </RouterProvider>
)

export default AppContexts
