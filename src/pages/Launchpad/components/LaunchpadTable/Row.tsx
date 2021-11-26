import React, { useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@123swap/uikit'
import useI18n from 'hooks/useI18n'

import CellLayout from './CellLayout'
import { DesktopColumnSchema, MobileColumnSchema } from '../types'
import Cell, {CellProps} from "./Cell";
import ProjectName, {ProjectNameProps} from "./ProjectName";
import Details from "./Details";


export interface RowProps {
  name: ProjectNameProps
  start_date: CellProps
  end_date: CellProps
  price: CellProps
  max: CellProps
  details: CellProps
}

const cells = {
  name: ProjectName,
  start_date: Cell,
  end_date: Cell,
  price: Cell,
  max: Cell,
  details: Details
}

const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`

const StyledTr = styled.tr`
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
`

const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`

const AprMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;
`

const FarmMobileCell = styled.td`
  padding-top: 24px;
`

const Row: React.FunctionComponent<RowProps> = (props) => {
  const { details } = props
  const [actionPanelToggled, setActionPanelToggled] = useState(false)
  const TranslateString = useI18n()

  const toggleActionPanel = () => {
    setActionPanelToggled(!actionPanelToggled)
  }

  const { isXl, isXs } = useMatchBreakpoints()

  const isMobile = !isXl
  const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const handleRenderRow = () => {

    return (
      <StyledTr onClick={toggleActionPanel}>
        {Object.keys(props).map((key) => {
          const columnIndex = columnNames.indexOf(key)
          if (columnIndex === -1) {
            return null
          }

          return (
            <td key={key}>
              <CellInner>
                <CellLayout
                  label={TranslateString(tableSchema[columnIndex].translationId, tableSchema[columnIndex].label)}
                >
                  {React.createElement(cells[key], props[key])}
                </CellLayout>
              </CellInner>
            </td>
          )

        })}
      </StyledTr>
    )
  }

  return (
    <>
      {handleRenderRow()}
    </>
  )
}

export default Row
