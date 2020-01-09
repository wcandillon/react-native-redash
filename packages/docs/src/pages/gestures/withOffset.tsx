import React from "react"

import { CodeHighlight, SEO } from "src/components"

const WithOffsetPage: React.FC = () => (
  <>
    <SEO title="withOffset - Gestures" />

    <h1>withOffset(value: Node, state: Node, offset: Node = 0): Node</h1>

    <p>Decorates animated value to save previous offset of pan</p>

    <CodeHighlight
      code={`
constructor(props) {
  const dragX = new Value(0);
  const panState = new Value(0);

  this.handlePan = event([
    {
      nativeEvent: {
        translationX: dragX,
        state: panState,
      },
    },
  ]);

  this.X = withOffset(dragX, panState);
}
      `}
    />
  </>
)

export default WithOffsetPage
