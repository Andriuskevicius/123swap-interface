import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Text, Image } from '@123swap/uikit'
import useI18n from 'hooks/useI18n'

import Tooltip from '../Tooltip/Tooltip'
import {TranslateString} from "../../../../utils/translateTextHelpers";

export interface ProjectNameProps {
  value: string;
  icon: string;
}

const IconImage = styled(Image)`
  width: 24px;
  height: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
    height: 40px;
  }
`

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
  padding-left: 16px;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const ProjectName: React.FunctionComponent<ProjectNameProps> = ({ value, icon}) => {
  return (
    <Container>
      <IconImage src={`${icon}`} alt="icon" width={40} height={40} mr="8px" />
      <LiquidityWrapper>
        <Text>{value}</Text>
      </LiquidityWrapper>
    </Container>
  )
}

export default ProjectName
