import React from "react"
import { Redirect } from "@reach/router"

const MathPage: React.FC = () => <Redirect to="/math/inc" noThrow replace />

export default MathPage
