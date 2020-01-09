import React from "react"

import { CodeHighlight, SEO } from "src/components"

const FindPage: React.FC = () => (
  <>
    <SEO title="find - Array" />

    <h1>
      find(nodes: Node[], predicate: (v: Node) => Node, notFound: Node): Node
    </h1>

    <p>
      Iterates over the node's list, returning the first element predicate
      returns true for. The predicate is invoked with the value argument.
    </p>

    <CodeHighlight
      code={`
find(values: Node[], predicate: (Node) => Node, notFound: Node) => Node
      `}
    />
  </>
)

export default FindPage
