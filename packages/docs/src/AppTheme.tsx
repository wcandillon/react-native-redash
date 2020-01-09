import React from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { ThemeProvider as RNThemeProvider } from "styled-components/native"

import { THEME } from "src/styles"

const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
    display: flex;
  }
  body {
    margin: 0;
    flex: 1;
    display: flex;
    max-width: 100%;
  }

  #___gatsby {
    position: relative;
    width: 100%;
    min-height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  a {
    transition: color 150ms;
    color: ${({ theme }) => theme.colors.MAIN};

    &:hover {
      color: ${({ theme }) => theme.colors.MAIN_LIGHT};
    }
  }

  h1 {
    padding-left: 12px;
    border-left: 4px solid ${({ theme }) => theme.colors.MAIN};
  }

  p {
    code {
      padding: 3px 6px;
      margin: 0;
      font-size: 85%;
      font-weight: 500;
      background-color: ${({ theme }) => theme.colors.SILVER};
      border-radius: 3px;
    }
  }

  table {
    display: block;
    width: 100%;
    overflow: auto;
    border-spacing: 0;
    border-collapse: collapse;

    tr {
      background-color: ${({ theme }) => theme.colors.WHITE};
      border-top: 1px solid ${({ theme }) => theme.colors.SILVER};
    }
    tr:nth-child(2n) {
      background-color: ${({ theme }) => theme.colors.SILVER};
    }

    td, th {
      padding: 6px 13px;
      border: 1px solid ${({ theme }) => theme.colors.SILVER};
    }

    th {
      font-weight: 600;
    }
  }

  * {
    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
    color: #24292e;
    box-sizing: border-box;
    box-shadow: none;
    outline: none;
  }
`

const AppTheme: React.FC = ({ children }) => (
  <RNThemeProvider theme={THEME}>
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  </RNThemeProvider>
)

export default AppTheme
