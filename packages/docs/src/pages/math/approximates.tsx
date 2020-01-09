import React from "react"

import { SEO } from "src/components"

const AproximatesPage: React.FC = () => (
  <>
    <SEO title="approximates - Math" />

    <h1>
      approximates(value: Node, approximatesTo: Node, precision = 0.001): number
    </h1>

    <p>
      Returns 1 if the difference between the two values is less than precision.
      Otherwise returns 0. Default value for the precision is 0.001.
    </p>
  </>
)

export default AproximatesPage
