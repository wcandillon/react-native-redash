import React from "react"

import { CodeHighlight, SEO } from "src/components"

const MaxPage: React.FC = () => (
  <>
    <SEO title="max - Math" />

    <h1>max(...nodes: Node[]): Node</h1>

    <p>
      Takes one or more nodes as input and returns the maximum of all the node's
      values. This is equivalent to Animated.max but with support for more than
      two parameters.
    </p>

    <CodeHighlight
      code={`
max(...args: Node[]) => Node
      `}
    />
  </>
)

export default MaxPage
