import React from "react"

import { CodeHighlight, SEO } from "src/components"

const ClampPage: React.FC = () => (
  <>
    <SEO title="clamp - Math" />

    <h1>clamp(node: Node, lowerBound: Adaptable, upperBound: Adaptable)</h1>

    <p>Clamps a node with a lower and upper bound.</p>

    <CodeHighlight
      code={`
clamp(new Value(-1), 0, 100); // 0
clamp(new Value(1), 0, 100); // 1
clamp(new Value(101), 0, 100); // 100
      `}
    />
  </>
)

export default ClampPage
