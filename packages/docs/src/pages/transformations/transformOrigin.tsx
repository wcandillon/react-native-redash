import React from "react"

import { CodeHighlight, SEO } from "src/components"

const TransformOriginPage: React.FC = () => (
  <>
    <SEO title="transformOrigin - Transformations" />

    <h1>transformOrigin(x, y, transformations)</h1>

    <p>Changes the origin of the transformations.</p>

    <CodeHighlight
      code={`
transformOrigin(x: Node, y: Node, transformations: AnimatedTransform): Node[]
      `}
    />

    <p>Example:</p>

    <CodeHighlight
      code={`
<View
  style={{
    transform: transformOrigin(cx, cy, { rotateX })
  }}
/>
  `}
    />

    <p>
      Example usage with <code>transform</code>.
    </p>

    <CodeHighlight
      code={`
const perspective = 800;
const z = new Value(100);
//...
transform: [{ perspective }, translateZ(perspective, z)];
  `}
    />
  </>
)

export default TransformOriginPage
