import React from "react"

import { CodeHighlight, SEO } from "src/components"

const VerticalPanGestureHandler: React.FC = () => (
  <>
    <SEO title="verticalPanGestureHandler - Gestures" />

    <h1>verticalPanGestureHandler()</h1>

    <CodeHighlight
      code={`
const {
  gestureHandler,
  state
  translationY,
  velocityY,
} = verticalPanGestureHandler();

return (
  <PanGestureHandler {...gestureHandler} />
);
      `}
    />
  </>
)

export default VerticalPanGestureHandler
