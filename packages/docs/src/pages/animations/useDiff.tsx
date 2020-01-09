import React from "react"

import { SEO } from "src/components"

const UseDiffPage: React.FC = () => (
  <>
    <SEO title="useDiff - Animations" />

    <h1>useDiff(node: Node, deps): Node</h1>

    <p>
      Returns a difference between the node value from the last frame and the
      current one. <code>useDiff</code> works for every frame whereas{" "}
      <code>diff</code> works on every evaluation.
    </p>
  </>
)

export default UseDiffPage
