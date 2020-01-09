import React, { useContext } from "react"
import styled from "styled-components"

import { LayoutContext } from "src/contexts"
import { MEDIA } from "src/styles"

import { SIDEBAR_WIDTH } from "../../modules/constants"
import { SIDEBAR_ITEMS } from "./modules/constants"
import MultipleLinkItem from "./components/MultipleLinkItem"
import SingleLinkItem from "./components/SingleLinkItem"

const Overlay = styled.div<{ isMobileSidebarVisible: boolean }>`
  transition: opacity 300ms linear;
  position: fixed;
  z-index: ${({ isMobileSidebarVisible }) => (isMobileSidebarVisible ? 10 : 0)};
  opacity: ${({ isMobileSidebarVisible }) => (isMobileSidebarVisible ? 1 : 0)};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);

  @media (${MEDIA.LG}) {
    z-index: 0;
    opacity: 0;
  }
`

const ASide = styled.aside<{ isMobileSidebarVisible: boolean }>`
  transition: left 300ms ease-in-out;
  position: fixed;
  top: 0;
  bottom: 0;
  left: ${({ isMobileSidebarVisible }) =>
    isMobileSidebarVisible ? 0 : -SIDEBAR_WIDTH}px;
  z-index: 10;
  width: ${SIDEBAR_WIDTH}px;
  background: ${({ theme }) => theme.colors.SILVER};
  padding: 40px 20px;
  overflow-y: auto;

  @media (${MEDIA.LG}) {
    left: 0;
    z-index: 10;
  }
`

const SearchInput = styled.input`
  transition: background-color 300ms ease-in-out;
  font-size: 14px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.06);
  box-shadow: none;
  outline: none;
  border: none;
  border-radius: 3px;
  padding: 8px 12px;

  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`

const Sidebar: React.FC = () => {
  const { isMobileSidebarVisible, setMobileSidebarVisible } = useContext(
    LayoutContext
  )

  return (
    <>
      <Overlay
        isMobileSidebarVisible={isMobileSidebarVisible}
        onClick={() => setMobileSidebarVisible(false)}
      />

      <ASide isMobileSidebarVisible={isMobileSidebarVisible}>
        <SearchInput placeholder="Search..." />

        <Menu>
          {SIDEBAR_ITEMS.map((item, index) => {
            if (item.type === "single") {
              return <SingleLinkItem key={index} {...item} />
            }

            return <MultipleLinkItem key={index} {...item} />
          })}
        </Menu>
      </ASide>
    </>
  )
}

export default Sidebar
