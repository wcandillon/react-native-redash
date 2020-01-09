import React from "react"

import { CodeHighlight, SEO } from "src/components"

const TranslateZPage: React.FC = () => (
  <>
    <SEO title="translateZ - Transformations" />

    <h1>translateZ(perspective, z)</h1>

    <p>Convert a translateZ transformation into a scale transformation.</p>

    <CodeHighlight
      code={`
translateZ(perspective: Node, z: Node)
      `}
    />
  </>
)

export default TranslateZPage
