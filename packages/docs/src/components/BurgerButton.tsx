import React from "react"
import styled from "styled-components"

const BUTTON_SIZE_REM = 1.5

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: ${BUTTON_SIZE_REM}rem;
  height: ${BUTTON_SIZE_REM}rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`

const Line = styled.div`
  width: ${BUTTON_SIZE_REM}rem;
  height: ${BUTTON_SIZE_REM / 8}rem;
  background: ${({ theme }) => theme.colors.BLACK_SHARK};
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
`

const FirstLine = styled(Line)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(45deg)" : "rotate(0)")};
`

const SecondtLine = styled(Line)<{ isOpen: boolean }>`
  opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
  transform: ${({ isOpen }) => (isOpen ? "translateX(20px)" : "translateX(0)")};
`

const ThirdLine = styled(Line)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(-45deg)" : "rotate(0)")};
`

type Props = {
  isOpen: boolean
  onClick?: () => void
}

const BurguerButton: React.FC<Props> = ({ isOpen, onClick }) => (
  <StyledButton onClick={onClick}>
    <FirstLine isOpen={isOpen} />
    <SecondtLine isOpen={isOpen} />
    <ThirdLine isOpen={isOpen} />
  </StyledButton>
)

export default BurguerButton
