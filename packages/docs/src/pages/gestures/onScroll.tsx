import React from "react"

import { CodeHighlight, SEO } from "src/components"

const OnScrollPage: React.FC = () => (
  <>
    <SEO title="onScroll - Gestures" />

    <h1>onScroll(&#123; x: Node, y: Node &#125;): EventNode</h1>

    <p>Returns a reanimated event handler for the ScrollView.</p>

    <CodeHighlight
      code={`
onScroll(contentOffset: { x?: Node; y?: Node; }) => EventNode
      `}
    />

    <p>
      Example usage for a vertical <code>ScrollView</code>.
    </p>

    <CodeHighlight
      code={`
<Animated.ScrollView onScroll={onScroll({ y: new Value(0) })} vertical />
      `}
    />

    <p>And for a horizontal one..</p>

    <CodeHighlight
      code={`
<Animated.ScrollView onScroll={onScroll({ x: new Value(0) })} horizontal />
      `}
    />
  </>
)

export default OnScrollPage
