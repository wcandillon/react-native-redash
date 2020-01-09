import React from "react"

import { CodeHighlight, SEO } from "src/components"

const UseValuesPage: React.FC = () => (
  <>
    <SEO title="useValues - Animations" />

    <h1>useValues(...Default Values[], deps)</h1>

    <p>
      Create animation values which lifecycle is granted by <code>deps</code>.
      For instance the code snippet below:
    </p>

    <CodeHighlight
      code={`
const [toggle, state] = useValues([0, State.UNDETERMINED], []);
      `}
    />

    <p>is a shortcut for</p>

    <CodeHighlight
      code={`
const [toggle state] = useMemoOne(() => [new Value(0), new Value(State.UNDETERMINED)], []);
      `}
    />
  </>
)

export default UseValuesPage
