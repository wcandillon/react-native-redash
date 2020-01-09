import React from "react"

import { CodeHighlight, SEO } from "src/components"

const ToRadPage: React.FC = () => (
  <>
    <SEO title="toRad - Math" />

    <h1>toRad(node: Node): Node</h1>

    <p>Transforms an angle from degrees to radians.</p>

    <CodeHighlight
      code={`
toRad(deg: Node) => Node;
      `}
    />
  </>
)

export default ToRadPage
