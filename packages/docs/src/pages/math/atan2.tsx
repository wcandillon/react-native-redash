import React from "react"

import { CodeHighlight, SEO } from "src/components"

const Atan2Page: React.FC = () => (
  <>
    <SEO title="atan2 - Math" />

    <h1>atan2(node: Node): Node</h1>

    <p>
      Returns the angle in the plane (in radians) between the positive x-axis
      and the ray from (0,0) to the point (x,y),<code> atan2(y,x)</code>.
    </p>

    <CodeHighlight
      code={`
atan2(y: Node, x Node) => Node
      `}
    />
  </>
)

export default Atan2Page
