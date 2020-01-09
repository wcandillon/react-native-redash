import React from "react"

import { SEO } from "src/components"

const BetweenPage: React.FC = () => (
  <>
    <SEO title="between - Math" />

    <h1>
      between = (node: Node, lowerBound: Adaptable, upperBound: Adaptable,
      inclusive: boolean)
    </h1>

    <p>
      Returns <code>true</code> if node is within <code>lowerBound</code> and{" "}
      <code>upperBound</code>.
    </p>
  </>
)

export default BetweenPage
