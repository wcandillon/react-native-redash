import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { ISingleLinkItem } from "../modules/constants"

const StyledLink = styled(Link).attrs({
  activeClassName: "active",
})`
  transition-property: color, opacity;
  transition-duration: 300ms;
  padding: 10px 0px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.BLACK_SHARK};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.BLACK_SHARK};
  }

  &:not(.active):hover {
    opacity: 0.7;
  }

  &.active {
    color: ${({ theme }) => theme.colors.MAIN};
  }
`

const SingleLinkItem: React.FC<ISingleLinkItem> = ({ to, label }) => (
  <StyledLink to={to}>{label}</StyledLink>
)

export default SingleLinkItem
