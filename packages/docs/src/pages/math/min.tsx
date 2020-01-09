import React from "react"

import { CodeHighlight, SEO } from "src/components"

const MinPage: React.FC = () => (
  <>
    <SEO title="min - Math" />

    <h1>min(...nodes: Node[]): Node</h1>

    <p>
      Takes one or more nodes as input and returns the minimum of all the node's
      values. This is equivalent to Animated.min but with support for more than
      two parameters.
    </p>

    <CodeHighlight
      code={`
min(...args: Node[]) => Node
      `}
    />
  </>
)

export default MinPage
