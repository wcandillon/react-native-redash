import React from "react"

import { CodeHighlight, SEO } from "src/components"

const SpringPage: React.FC = () => (
  <>
    <SEO title="spring - Animations" />

    <h1>
      spring(&#123; clock: Clock, value: Node, velocity: Node, deceleration:
      number &#125;): Node
    </h1>

    <p>Convenience function to run a spring animation.</p>

    <CodeHighlight
      code={`
spring({ clock: Clock, value: Node, velocity: Node, deceleration: number} ): Node
      `}
    />
  </>
)

export default SpringPage
