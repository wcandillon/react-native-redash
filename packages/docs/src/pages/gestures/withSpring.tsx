import React from "react"

import { CodeHighlight, SEO } from "src/components"

const WithSpringPage: React.FC = () => (
  <>
    <SEO title="withSpring - Gestures" />

    <h1>
      withSpring(&#123; value: Node, velocity: Node, state: Value, offset: Node,
      config, snapPoints: Node[], onSnap: (value) => void &#125;): Node
    </h1>

    <p>Decorates animated value to spring when the gesture ends.</p>

    <CodeHighlight
      code={`
const translateX = withSpring({
  value: translationX,
  velocity: velocityX,
  state,
  snapPoints,
  onSnap
});
      `}
    />
  </>
)

export default WithSpringPage
