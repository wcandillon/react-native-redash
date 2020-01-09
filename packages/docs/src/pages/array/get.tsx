import React from "react"

import { CodeHighlight, SEO } from "src/components"

const GetPage: React.FC = () => (
  <>
    <SEO title="get - Array" />

    <h1>get(nodes: Adaptable[], index:Adaptable, notFound: Node): Node</h1>

    <p>
      Returns the node from the list of nodes at the specified index. If not, it
      returns the notFound node.
    </p>

    <CodeHighlight
      code={`
get(values: Node[], index: Node, notFound: Node) => Node
      `}
    />
  </>
)

export default GetPage
