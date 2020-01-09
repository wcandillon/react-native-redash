import React from "react"

import { CodeHighlight, SEO } from "src/components"

const ToDegPage: React.FC = () => (
  <>
    <SEO title="toDeg - Math" />

    <h1>toDeg(node: Node): Node</h1>

    <p>Transforms an angle from radians to degrees.</p>

    <CodeHighlight
      code={`
toDeg(deg: Node) => Node;
      `}
    />
  </>
)

export default ToDegPage
