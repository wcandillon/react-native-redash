import React from "react"

import { SEO } from "src/components"

const TransitionsPage: React.FC = () => (
  <>
    <SEO title="Transitions" />

    <h1>Transitions</h1>

    <p>
      Transitions are essential to the user experience. Redash offers four
      utility functions for transitions which are broke down in the table below.
      If you want to build a transition based on a React state change use
      <code>useTimingTransition()</code> or <code>useSpringTransition()</code>.
      To transition an animation value change, use{" "}
      <code>withTimingTransition()</code> or
      <code>withSpringTransition()</code>.
    </p>

    <table>
      <thead>
        <tr>
          <th></th>
          <th align="center">State (JS Thread)</th>
          <th align="center">Value (UI Thread)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Timing</td>
          <td align="center">useTimingTransition()</td>
          <td align="center">withTimingTransition()</td>
        </tr>
        <tr>
          <td>Spring</td>
          <td align="center">useSpringTransition()</td>
          <td align="center">withSpringTransition()</td>
        </tr>
      </tbody>
    </table>
  </>
)

export default TransitionsPage
