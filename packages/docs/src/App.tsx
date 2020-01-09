import React from "react"

import AppTheme from "src/AppTheme"
import AppContexts from "src/AppContexts"
import Layout from "src/layout"

const App: React.FC = ({ children }) => (
  <AppTheme>
    <AppContexts>
      <Layout>{children}</Layout>
    </AppContexts>
  </AppTheme>
)

export default App
