import React from "react"

import { CodeHighlight, SEO } from "src/components"

const PreserveMultiplicativeOffsetPage: React.FC = () => (
  <>
    <SEO title="preserveMultiplicativeOffset - Gestures" />

    <h1>preserveMultiplicativeOffset(value: Node, state: Node): Node</h1>

    <p>Decorates animated value to save previous offset of pinch</p>

    <CodeHighlight
      code={`
constructor(props) {
  const scale = new Value(1);
  const scaleState = new Value(0);

  this.handleZoom = event([
    {
      nativeEvent: {
        scale,
        state: scaleState,
      },
    },
  ]);

  this.X = preserveMultiplicativeOffset(scale, scaleState);
}
      `}
    />
  </>
)

export default PreserveMultiplicativeOffsetPage
