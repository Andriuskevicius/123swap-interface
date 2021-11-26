import React from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import useI18n from 'hooks/useI18n'
import { Button } from '@123swap/uikit'
import {CellProps} from "./Cell";

interface DetailsProps {
  actionPanelToggled: boolean
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`

const Details: React.FC<CellProps> = ({ value }) => {
  const TranslateString = useI18n()
  const history = useHistory();

  const routeChange = (id:string) =>{
    const path = `/launchpad/${id}`;
    history.push(path);
  }


  return (
    <Container>
      <Button
          disabled={false}
          onClick={() => {routeChange(value)}}
          ml="4px"
        >
          {TranslateString(562, 'Buy')}
        </Button>
    </Container>
  )
}

export default Details
