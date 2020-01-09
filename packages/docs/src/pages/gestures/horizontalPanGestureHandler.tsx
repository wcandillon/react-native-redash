import React from "react"

import { CodeHighlight, SEO } from "src/components"

const HorizontalPanGestureHandler: React.FC = () => (
  <>
    <SEO title="horizontalPanGestureHandler - Gestures" />

    <h1>horizontalPanGestureHandler()</h1>

    <CodeHighlight
      code={`
const {
  gestureHandler,
  state
  translationX,
  velocityX,
} = horizontalPanGestureHandler();

return (
  <PanGestureHandler {...gestureHandler} />
);
      `}
    />
  </>
)

export default HorizontalPanGestureHandler
