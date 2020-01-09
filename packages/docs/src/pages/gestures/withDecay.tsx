import React from "react"

import { CodeHighlight, SEO } from "src/components"

const WithDecayPage: React.FC = () => (
  <>
    <SEO title="withDecay - Gestures" />

    <h1>
      withDecay(&#123; value: Node, velocity: Node, state: Value, offset: Node,
      deceleration &#125;): Node
    </h1>

    <p>Decorates animated value to decay when the gesture ends.</p>

    <CodeHighlight
      code={`
const translateX = withDecay({
  value: translationX,
  velocity: velocityX,
  state: gestureState,
  offset: offsetX
});
      `}
    />
  </>
)

export default WithDecayPage
