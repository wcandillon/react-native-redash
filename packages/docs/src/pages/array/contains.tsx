import React from "react"

import { CodeHighlight, SEO } from "src/components"

const ContainsPage: React.FC = () => (
  <>
    <SEO title="contains - Array" />

    <h1>contains(nodes: Node[], value: Node) : number</h1>

    <p>
      Returns 1 if the node's value is contained in the array of nodes, 0
      otherwise.
    </p>

    <CodeHighlight
      code={`
contains(values: Node[], value: Node) => Node
      `}
    />
  </>
)

export default ContainsPage
