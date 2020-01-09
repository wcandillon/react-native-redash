import React from "react"

import { CodeHighlight, SEO } from "src/components"

const OnGestureEventPage: React.FC = () => (
  <>
    <SEO title="onGestureEvent - Gestures" />

    <h1>onGestureEvent(nativeEvent)</h1>

    <p>
      Returns a reanimated event handler for any Gesture handler event handler.
    </p>
    <p>
      Example usage for a vertical <code>PanGestureHandler</code>.
    </p>

    <CodeHighlight
      code={`
const translationX = new Value(0);
const state = new Value(State.UNDETERMINED);
const gestureHandler = onGestureEvent({ translationX, state });
return <PanGestureHandler {...gestureHandler} />;
      `}
    />
  </>
)

export default OnGestureEventPage
