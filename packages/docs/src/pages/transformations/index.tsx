import React from "react"
import { Redirect } from "@reach/router"

const TransformationsPage: React.FC = () => (
  <Redirect to="/transformations/translateZ" noThrow replace />
)

export default TransformationsPage
