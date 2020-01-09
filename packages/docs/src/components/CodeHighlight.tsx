import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/oceanicNext"
import styled from "styled-components"

const Pre = styled.pre`
  padding: 1em;
  border-radius: 0.3em;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  tab-size: 4;
  hyphens: none;
  max-width: 100%;
  overflow-x: auto;

  position: relative;
  padding-left: 3.8em;
  counter-reset: linenumber;

  .token {
    color: inherit;
  }
`

const LineNumbers = styled.div`
  position: absolute;
  pointer-events: none;
  top: 1em;
  font-size: 100%;
  left: 0;
  width: 3em;
  letter-spacing: -1px;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  -webkit-user-select: none;
`

const Number = styled.div`
  pointer-events: none;
  display: block;
  counter-increment: linenumber;

  :before {
    content: counter(linenumber);
    color: rgba(255, 255, 255, 0.5);
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }
`

type Props = {
  code: string
}

const CodeHighlight: React.FC<Props> = ({ code }) => (
  <Highlight
    {...defaultProps}
    theme={theme}
    code={code.trim()}
    language="javascript"
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}

        <LineNumbers>
          {tokens.map((line, i) => (
            <Number key={i} />
          ))}
        </LineNumbers>
      </Pre>
    )}
  </Highlight>
)

export default CodeHighlight
