import React from "react"

import { CodeHighlight, SEO } from "src/components"

const TimingPage: React.FC = () => (
  <>
    <SEO title="timing - Animations" />

    <h1>
      timing(&#123; clock?: Clock, from?: Node, to?: Node, duration?: Node,
      easing?: EasingFunction &#125;): Node
    </h1>

    <p>Convenience function to run a timing animation.</p>

    <p>Example usage:</p>

    <CodeHighlight
      code={`
timing({
  duration: 10 * 1000,
  from: 0,
  to: 1,
  easing: Easing.linear,
});
      `}
    />
  </>
)

export default TimingPage
