import React, { useContext } from "react"
import styled from "styled-components"

import { BurgerButton } from "src/components"
import { LayoutContext } from "src/contexts"
import { MEDIA } from "src/styles"

const Wrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 20px;

  @media (${MEDIA.LG}) {
    display: none;
  }
`

const Header: React.FC = () => {
  const { isMobileSidebarVisible, setMobileSidebarVisible } = useContext(
    LayoutContext
  )

  return (
    <Wrapper>
      <BurgerButton
        isOpen={isMobileSidebarVisible}
        onClick={() => setMobileSidebarVisible(!isMobileSidebarVisible)}
      />
    </Wrapper>
  )
}

export default Header
