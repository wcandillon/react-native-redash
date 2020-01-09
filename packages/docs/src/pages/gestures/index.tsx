import React from "react"
import { Redirect } from "@reach/router"

const GesturesPage: React.FC = () => (
  <Redirect to="/gestures/onScroll" noThrow replace />
)

export default GesturesPage
