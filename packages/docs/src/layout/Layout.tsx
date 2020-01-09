import React from "react"
import styled from "styled-components"

import { MEDIA } from "src/styles"

import { SIDEBAR_WIDTH } from "./modules/constants"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

const Main = styled.main`
  transition: padding-left 300ms ease-in-out;
  position: relative;
  z-index: 5;
  flex: 1;
  display: flex;
  max-width: 100%;

  @media (${MEDIA.LG}) {
    padding-left: ${SIDEBAR_WIDTH}px;
  }
`

const MainInner = styled.div`
  position: relative;
  flex: 1;
  max-width: 100%;
`

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 20px;
  width: 100%;
  max-width: 100%;

  @media (${MEDIA.LG}) {
    width: 920px;
    padding: 40px;
  }
`

const Layout: React.FC = ({ children }) => (
  <Wrapper>
    <Sidebar />

    <Main>
      <MainInner>
        <Header />

        <MainContainer>{children}</MainContainer>
      </MainInner>
    </Main>
  </Wrapper>
)

export default Layout
