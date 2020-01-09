import React from "react"
import styled, { css } from "styled-components/native"

const TouchableOpacity = styled.TouchableOpacity<{ block?: boolean }>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 3;
  background-color: ${({ theme }) => theme.colors.MAIN};
  padding-horizontal: 8;
  padding-vertical: 8;

  ${({ block }) =>
    block &&
    css`
      width: 100%;
    `}
`

const Text = styled.Text`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.WHITE};
`

type Props = {
  block?: boolean
  onPress?: () => void
  children: string
}

const Button: React.FC<Props> = ({ block, onPress, children }) => (
  <TouchableOpacity block={block} onPress={onPress}>
    <Text>{children}</Text>
  </TouchableOpacity>
)

Button.defaultProps = {
  block: true,
}

export default Button
