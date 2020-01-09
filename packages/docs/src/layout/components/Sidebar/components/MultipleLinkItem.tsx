import React, { useState, useMemo, useEffect, useContext } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { RouterContext } from "src/contexts"

import { IMultipleLinkItem } from "../modules/constants"
import ArrowDown from "./ArrowDown"

const SUBITEM_HEIGHT = 32
const INNER_PADDING_TOP = 0
const INNER_PADDING_BOTTOM = 7

const Toggler = styled.div<{ isActive: boolean }>`
  transition-property: color, opacity;
  transition-duration: 300ms;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
  font-weight: 600;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.MAIN : theme.colors.BLACK_SHARK};
  cursor: pointer;

  &:hover {
    opacity: ${({ isActive }) => (isActive ? 1 : 0.8)};
  }
`

const ArrowWrapper = styled.div<{ isOpen: boolean }>`
  transition: transform 300ms ease-in-out;
  transform: rotate(${({ isOpen }) => (isOpen ? 180 : 0)}deg);
`

const Inner = styled.div<{ isOpen: boolean; maxHeight: number }>`
  transition-property: opacity, max-height, padding-top, padding-bottom;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  padding-left: 15px;
  border-left: 1px dashed rgba(0, 0, 0, 0.25);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  max-height: ${({ isOpen, maxHeight }) =>
    isOpen ? maxHeight + INNER_PADDING_TOP + INNER_PADDING_BOTTOM : 0}px;
  padding-top: ${({ isOpen }) => (isOpen ? INNER_PADDING_TOP : 0)}px;
  padding-bottom: ${({ isOpen }) => (isOpen ? INNER_PADDING_BOTTOM : 0)}px;
  overflow: hidden;
`

const StyledLink = styled(Link).attrs({
  activeClassName: "active",
})`
  transition: color 300ms;
  display: flex;
  align-items: center;
  height: ${SUBITEM_HEIGHT}px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;

  &:hover,
  &.active {
    color: rgba(0, 0, 0, 0.8);
  }
`

const getIsActive = ({ subitems }: IMultipleLinkItem, currentPath: string) =>
  subitems.filter(({ to }) => to === currentPath).length > 0

const MultipleLinkItem: React.FC<IMultipleLinkItem> = props => {
  const { pathname } = useContext(RouterContext)

  const [isActive, setActive] = useState(getIsActive(props, pathname))
  const [isOpen, setOpen] = useState(isActive)

  const { label, subitems } = props

  useEffect(() => {
    setActive(getIsActive(props, pathname))
  }, [pathname])

  useEffect(() => {
    if (!isActive) {
      setOpen(false)
    }
  }, [isActive])

  const maxHeight = useMemo(() => subitems.length * SUBITEM_HEIGHT, [subitems])

  return (
    <>
      <Toggler isActive={isActive} onClick={() => setOpen(!isOpen)}>
        {label}

        <ArrowWrapper isOpen={isOpen}>
          <ArrowDown />
        </ArrowWrapper>
      </Toggler>

      <Inner isOpen={isOpen} maxHeight={maxHeight}>
        {subitems.map((subitem, index) => (
          <StyledLink to={subitem.to} key={index}>
            {subitem.label}
          </StyledLink>
        ))}
      </Inner>
    </>
  )
}

export default MultipleLinkItem
