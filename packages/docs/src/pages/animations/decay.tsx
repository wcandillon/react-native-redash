import React from "react"

import { CodeHighlight, SEO } from "src/components"

const DecayPage: React.FC = () => (
  <>
    <SEO title="decay - Animations" />

    <h1>
      decay(&#123; clock: Clock, value: Node, velocity: Node, deceleration:
      number &#125;): Node
    </h1>

    <p>Convenience function to run a decay animation.</p>

    <CodeHighlight
      code={`
decay({ clock: Clock, value: Node, velocity: Node, deceleration: number} ): Node
      `}
    />
  </>
)

export default DecayPage
