import React from "react"

import { CodeHighlight, SEO } from "src/components"

const LoopPage: React.FC = () => (
  <>
    <SEO title="timing - Animations" />

    <h1>
      loop(&#123; clock: Clock, duration: Node, easing: EasingFunction:
      boomerang? = false, autoStart? = true &#125;): Node
    </h1>

    <p>
      Returns an animated node that goes from <code>0</code> to <code>1</code>{" "}
      during the time set by
      <code>duration</code> continuously. If the <code>boomerang</code> option
      is set to <code>true</code>, the animation goes from <code>0</code> to{" "}
      <code>1</code> and then from <code>1</code> to <code>0</code> in the next
      cycle.
    </p>

    <p>Example usage:</p>

    <CodeHighlight
      code={`
const progress = new Value(0);
set(progress, loop({ duration: 400, easing: Easing.linear }));
      `}
    />
  </>
)

export default LoopPage
