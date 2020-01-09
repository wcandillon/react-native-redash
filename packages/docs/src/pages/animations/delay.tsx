import React from "react"

import { CodeHighlight, SEO } from "src/components"

const Delay: React.FC = () => (
  <>
    <SEO title="delay - Animations" />

    <h1>delay(node: Node, duration: number)</h1>

    <p>
      Evaluate an animation node after a certain amount of time.{" "}
      <code>duration</code> is in milliseconds.
    </p>

    <p>Example usage:</p>

    <CodeHighlight
      code={`
delay(set(value, 1), 250);
      `}
    />
  </>
)

export default Delay
