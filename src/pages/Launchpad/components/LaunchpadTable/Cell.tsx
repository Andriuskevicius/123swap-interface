import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Text } from '@123swap/uikit'
import useI18n from 'hooks/useI18n'

import Tooltip from '../Tooltip/Tooltip'
import {TranslateString} from "../../../../utils/translateTextHelpers";

export interface CellProps {
  value: string;
}

const LiquidityWrapper = styled.div`
  min-width: 110px;
  font-weight: 600;
  text-align: right;

  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const Cell: React.FunctionComponent<CellProps> = ({ value }) => {
  return (
    <Container>
      <LiquidityWrapper>
        <Text>{value}</Text>
      </LiquidityWrapper>
    </Container>
  )
}

export default Cell
