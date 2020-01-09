import React from "react"
import styled from "styled-components"

import { MEDIA } from "src/styles"

import CodeHighlight from "./CodeHighlight"
import IPhone from "./IPhone"

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: -10px 0px;

  @media (${MEDIA.LG}) {
    flex-direction: row;
    margin: 0 -15px;
  }
`

const Column = styled.div`
  margin: 10px 0;

  @media (${MEDIA.LG}) {
    margin: 0 15px;
  }
`

const LeftColumn = styled(Column)`
  flex: 1;
  width: 100%;
`

const RightColumn = styled(Column)`
  width: 180px;
`

type Props = {
  code: string
  device: React.ReactNode
}

const Playground: React.FC<Props> = ({ code, device }) => (
  <>
    <Grid>
      <LeftColumn>
        <CodeHighlight code={code} />
      </LeftColumn>

      <RightColumn>
        <IPhone>{device}</IPhone>
      </RightColumn>
    </Grid>
  </>
)

export default Playground
